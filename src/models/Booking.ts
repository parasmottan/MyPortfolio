import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  name: string;
  email: string;
  interest: string;
  projectDescription: string;
  selectedDate: Date;
  selectedTime: string;
  timezone: string;
  meetingLink?: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  interest: { type: String },
  projectDescription: { type: String, required: true },
  selectedDate: { type: Date, required: true }, // Store in UTC
  selectedTime: { type: String, required: true }, // Format "HH:MM" in UTC usually
  timezone: { type: String, required: true }, // standard IANA string e.g. "America/New_York"
  meetingLink: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// A compound unique index prevents any simultaneous double bookings
// Two users attempting to book exact same selectedDate and selectedTime will trigger a MongoDB duplicate key error for one of them
BookingSchema.index(
  { selectedDate: 1, selectedTime: 1 },
  { unique: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
