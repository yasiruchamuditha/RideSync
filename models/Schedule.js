//models/Schedule.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
    // Id of the bus   
    busId: {                      
        type: Schema.Types.ObjectId,
        ref: "Bus",
    },
    // Route of the bus
    route: {                            
        type: Schema.Types.ObjectId,
        ref: "Route", 
    },
    // Type of the bus route [Normal,Semi Luxury, Luxury]
    busRouteType: {                    
        type: String,
        required: true,
    },
    // Type of the bus route [NormalWay, ExpressWay]
    routeWay:{
        type: String,
        required: true,
    },
    // City where the bus starts its journey
    startCity: {                       
        type: String,
        required: true,
    },
    // Date of the schedule
    departureDate: {                           
        type: Date,
        required: true,
    },
    // Time of the bus departure
    departureTime: {                     
        type: String,
        required: true,
    },
    // City where the bus ends its journey
    endCity: {                       
        type: String,
        required: true,
    },
    // Time of the bus arrival at the destination
    arrivalTime: {                        
        type: String,
        required: true,
    },
    // Date of the schedule
    arrivalDate: {                         
        type: Date,
        required: true,
    },
    // Estimated time of the journey
    estimatedTime: {                     
        type: String,
        required: true,
    },
    // Estimated distance of the journey
    estimatedDistance: {                     
        type: String,
        required: true,
    },
    // Price of the ticket
    ticketPrice: {                      
        type: Number,
        required: true,
    },
    // Number of available seats
    availableSeats: {                   
        type: Number,
        default: 50,
        required: true,
    },
    // Layout of the seats
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
