import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { toDate } from 'date-fns-tz';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, interest, projectDescription, selectedDate, selectedTime, timezone } = body;

    if (!name || !email || !projectDescription || !selectedDate || !selectedTime || !timezone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    // Convert the local frontend `hh:mm a` string (e.g. "09:30 AM") to 24h for parsing parsing 
    const isPM = selectedTime.includes('PM');
    let [hoursStr, minutesStr] = selectedTime.split(' ')[0].split(':');
    let hours = parseInt(hoursStr, 10);
    if (isPM && hours !== 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;

    const localTime24 = `${hours.toString().padStart(2, '0')}:${minutesStr}`;

    // Compute exact UTC timestamp coordinates from the local coordinates
    const localDateTimeStr = `${selectedDate}T${localTime24}:00`;
    const slotDateObj = toDate(localDateTimeStr, { timeZone: timezone });

    if (slotDateObj < new Date()) {
      return NextResponse.json({ error: 'Cannot book a meeting in the past.' }, { status: 400 });
    }

    const utcDate = new Date(Date.UTC(slotDateObj.getUTCFullYear(), slotDateObj.getUTCMonth(), slotDateObj.getUTCDate()));
    const utcH = slotDateObj.getUTCHours().toString().padStart(2, '0');
    const utcM = slotDateObj.getUTCMinutes().toString().padStart(2, '0');
    const utcTime = `${utcH}:${utcM}`;

    // Google Calendar API Integration for real Google Meet Links
    let meetingLink = `https://meet.google.com/mock-${Math.random().toString(36).substring(7)}`;

    if (process.env.GOOGLE_REFRESH_TOKEN && process.env.GOOGLE_CLIENT_ID) {
      try {
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          process.env.GOOGLE_REDIRECT_URI
        );
        oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        const event = {
          summary: 'Client Meeting with Paras',
          description: `Meeting booked from portfolio website\n\nClient Name: ${name}\nClient Email: ${email}\nInterest: ${interest}\nProject: ${projectDescription}`,
          start: {
            dateTime: slotDateObj.toISOString()
          },
          end: {
            dateTime: new Date(slotDateObj.getTime() + 30 * 60000).toISOString() // +30 minutes
          },
          attendees: [{ email }],
          conferenceData: {
            createRequest: {
              requestId: "meet-" + Date.now(),
              conferenceSolutionKey: { type: 'hangoutsMeet' }
            }
          }
        };

        const response = await calendar.events.insert({
          calendarId: 'primary',
          conferenceDataVersion: 1,
          requestBody: event,
          sendUpdates: 'all'
        });

        const meetUri = response.data.conferenceData?.entryPoints?.[0]?.uri;
        if (meetUri) {
          meetingLink = meetUri;
        } else if (response.data.hangoutLink) {
          meetingLink = response.data.hangoutLink;
        }

      } catch (calError) {
        console.error("Google Calendar Event Creation Failed:", calError);
        // Silently falls back to mock link if there's a credential error
      }
    }

    try {
      // The compound unique index in MongoDB on { selectedDate, selectedTime } structurally guarantees no double bookings
      const booking = await Booking.create({
        name,
        email,
        interest,
        projectDescription,
        selectedDate: utcDate,
        selectedTime: utcTime,
        timezone,
        meetingLink
      });

      // Automated Nodemailer to both participants
      await sendConfirmationEmail(booking, selectedDate, selectedTime);

      return NextResponse.json({ success: true, booking });
    } catch (dbError: any) {
      if (dbError.code === 11000) {
        // Race condition mitigated successfully
        return NextResponse.json({ error: 'This time slot was just booked by someone else. Please select another.' }, { status: 409 });
      }
      throw dbError;
    }

  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}

async function sendConfirmationEmail(booking: any, localDate: string, localTime: string) {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log('No EMAIL_USER or EMAIL_PASS in environment. Using Mock Email behavior.');
    console.log(`[MOCK EMAIL SENT] To: ${booking.email}, Subject: Booking Confirmed...`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS }
  });

  await transporter.sendMail({
    from: EMAIL_USER,
    to: booking.email,
    subject: `Booking Confirmed: Discovery Call with Paras Mottan`,
    text: `Hi ${booking.name},\n\nYour discovery call has been successfully scheduled.\n\nDate: ${localDate}\nTime: ${localTime} (${booking.timezone})\nMeeting Link: ${booking.meetingLink}\n\nLooking forward to speaking with you!`,
  });

  await transporter.sendMail({
    from: EMAIL_USER,
    to: EMAIL_USER,
    subject: `New Booking: Discovery Call with ${booking.name}`,
    text: `You have a new booking request.\n\nName: ${booking.name}\nEmail: ${booking.email}\nInterest: ${booking.interest}\nProject: ${booking.projectDescription}\n\nDate: ${localDate}\nTime: ${localTime} (${booking.timezone})\nMeeting Link: ${booking.meetingLink}`,
  });
}
