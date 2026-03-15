import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { formatInTimeZone, toDate } from 'date-fns-tz';
import { addMinutes } from 'date-fns';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date'); // e.g. YYYY-MM-DD
    const timezone = searchParams.get('timezone'); // e.g. "America/New_York"

    if (!dateStr || !timezone) {
      return NextResponse.json({ error: 'Missing date or timezone' }, { status: 400 });
    }

    await dbConnect();

    // 1. We must find exactly 4 IST slots (10:20AM, 1:30PM, 3:40PM, 6:00PM) that fall on the user's local `dateStr`
    const targetDateLocal = toDate(`${dateStr}T00:00:00`, { timeZone: timezone });
    const baseDateUtc = new Date(Date.UTC(targetDateLocal.getUTCFullYear(), targetDateLocal.getUTCMonth(), targetDateLocal.getUTCDate()));

    const istTimezone = 'Asia/Kolkata';
    const dayOffsets = [-1, 0, 1]; // Generate yesterday, today, and tomorrow in IST to cover all localized boundary edges
    const slotTimes = [
      { h: 10, m: 20 },
      { h: 13, m: 30 },
      { h: 15, m: 40 },
      { h: 18, m: 0 }
    ];

    const allIstSlots: Date[] = [];
    dayOffsets.forEach(offset => {
      const d = new Date(baseDateUtc);
      d.setUTCDate(d.getUTCDate() + offset);
      const isoDayStr = d.toISOString().split('T')[0];

      slotTimes.forEach(t => {
        const hStr = t.h.toString().padStart(2, '0');
        const mStr = t.m.toString().padStart(2, '0');
        allIstSlots.push(toDate(`${isoDayStr}T${hStr}:${mStr}:00`, { timeZone: istTimezone }));
      });
    });

    const localDaySlots = allIstSlots.filter(slot => formatInTimeZone(slot, timezone, 'yyyy-MM-dd') === dateStr);

    const now = new Date();
    // Filter out past slots AND slots that fall between 1:00 AM and 5:00 AM (inclusive) in the visitor's local timezone
    const validSlots = localDaySlots.filter(slot => {
      if (slot <= now) return false;

      // Extract the hour in the user's local timezone
      const localHourStr = formatInTimeZone(slot, timezone, 'H'); // 'H' gives 0-23
      const localHour = parseInt(localHourStr, 10);

      if (localHour >= 1 && localHour <= 5) {
        return false; // Drop slots that fall in the middle of the night
      }

      return true;
    });

    // 2. Convert raw slot Dates into UTC mappings to check against the DB
    const possibleBookings = validSlots.map(slot => {
      // Create exact DB coordinates in UTC
      const utcDate = new Date(Date.UTC(slot.getUTCFullYear(), slot.getUTCMonth(), slot.getUTCDate()));
      const utcH = slot.getUTCHours().toString().padStart(2, '0');
      const utcM = slot.getUTCMinutes().toString().padStart(2, '0');
      const utcTime = `${utcH}:${utcM}`;

      const originalLocalSlot = formatInTimeZone(slot, timezone, 'hh:mm a'); // Format output to "09:00 AM"

      return { selectedDate: utcDate, selectedTime: utcTime, originalLocalSlot };
    });

    // 3. Query all existing bookings for these specific UTC dates
    const uniqueUtcDates = Array.from(new Set(possibleBookings.map(b => b.selectedDate.getTime()))).map(t => new Date(t));

    const existingBookings = await Booking.find({
      selectedDate: { $in: uniqueUtcDates }
    }).lean();

    // 4. Safely filter out the ones that are booked
    const available = possibleBookings.filter(slot => {
      const isBooked = existingBookings.some(
        booking =>
          new Date(booking.selectedDate).getTime() === slot.selectedDate.getTime() &&
          booking.selectedTime === slot.selectedTime
      );
      return !isBooked;
    });

    // 5. Return the available formatted local times ("09:00 AM", "09:30 AM", etc.)
    return NextResponse.json({
      availableSlots: available.map(a => a.originalLocalSlot)
    });

  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json({ error: 'Failed to fetch available slots' }, { status: 500 });
  }
}
