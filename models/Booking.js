import mongoose from "mongoose";
import { Schema } from "mongoose";

const BookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scheduleId: {
    type: Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "PayPal", "Bank Transfer"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed", "Refunded"],
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  transactionReference: {
    type: String,
    unique: true,
  },
  bookingSeats: {
    type: [String],
    required: true,
  },
  cancelSeats: [
    {
      seatNumber: { type: String },
      cancelDate: { type: Date, default: Date.now },
      reason: { type: String },
      userId: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
