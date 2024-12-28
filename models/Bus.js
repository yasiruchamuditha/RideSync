//models/Bus.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const busSchema = new Schema({
  // Bus NTC registration number
  ntcRegNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  // Bus Conductor's NTC registration number
  conductorNtcRegNumber: { 
    type: String, 
    required: true, 
    trim: true 
  }, 
  // Bus Driver's NTC registration number
  driverNtcRegNumber: { 
    type: String, 
    required: true, 
    trim: true 
  }, 
  // Bus's License Register number
  busNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  }, 
  // Bus Total seats
  capacity: { 
    type: Number, 
    min: 1,
    required: true 
  }, 
  // Bus type [Normal,Semi Luxury, Luxury]
  busType: { 
    type: String, 
    required: true, 
    trim: true 
  }, 
  // Bus sector [Government [CTB], Private]
  sector: { 
    type: String, 
    required: true, 
    trim: true 
  }, 
  // Route of the bus
  route: { 
    type: String, 
    required: true, 
    trim: true 
  }, 
  // Route number of the bus
  routeNo: { 
    type: String, 
    required: true, 
    trim: true 
  },
  // Operator reference
  operator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Bus = mongoose.model('Bus', busSchema);
export default Bus;