//schedule.js
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ScheduleSchema = new Schema({
    busId: {
        type: Schema.Types.ObjectId,
        ref: "Bus",
    },
    busRouteType: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startCity: {
        type: String,
        required: true,
    },
    endCity: {
        type: String,
        required: true,
    },
    route: {
        type: Schema.Types.ObjectId,
        ref: "Route",
    },
    departureTime: {
        type: String,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true,
    },

    estimatedTime: {
        type: String,
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
    },
    availableSeats: {
        type: Number,
        default: 50,
        required: true,
    },
    seatLayout: [
        {
            seatNumber: String,
            bookedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
            position: String,
            isBooked: { type: Boolean, default: false },
            seatAvailableState: { type: String, default: "available" },

        }
    ],
}, { timestamps: true });

export default mongoose.model('Schedule', ScheduleSchema);