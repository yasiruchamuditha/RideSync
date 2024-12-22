//models/schedule.js
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ScheduleSchema = new Schema({
    busId: {                            //Id of the bus
        type: Schema.Types.ObjectId,
        ref: "Bus",
    },
    route: {                            //route of the bus
        type: Schema.Types.ObjectId,
        ref: "Routes",
    },
    busRouteType: {                    //Type of the bus route [Normal,Semi Luxery,Luxery, ExpressWay]
        type: String,
        required: true,
    },
    startCity: {                        //city where the bus starts its journey
        type: String,
        required: true,
    },
    departureDate: {                            //date of the schedule
        type: Date,
        required: true,
    },
    departureTime: {                     //time of the bus departure from the start city
        type: String,
        required: true,
    },
    endCity: {                         //city where the bus ends its journey
        type: String,
        required: true,
    },
    arrivalTime: {                        //time of the bus arrival at the destination 
        type: String,
        required: true,
    },
    arrivalDate: {                            //date of the schedule
        type: Date,
        required: true,
    },
    estimatedTime: {                     //estimated time of the journey
        type: String,
        required: true,
    },
    estimatedDistance: {                     //estimated distance of the journey
        type: String,
        required: true,
    },
    ticketPrice: {                      //price of the ticket
        type: Number,
        required: true,
    },
    availableSeats: {                   //number of available seats
        type: Number,
        default: 50,
        required: true,
    },
    seatLayout: [                       //layout of the seats
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