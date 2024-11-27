const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  ntcRegistrationNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  }, // NTC registration number for the bus
  conductorNtcRegistrationNumber: { 
    type: String, 
    required: true, 
    trim: true 
  }, // Conductor's NTC registration number
  driverNtcRegistrationNumber: { 
    type: String, 
    required: true, 
    trim: true 
  }, // Driver's NTC registration number
  busNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  }, // Bus's unique number
  capacity: { 
    type: Number, 
    required: true 
  }, // Total number of seats
  route: { 
    type: String, 
    required: true, 
    trim: true 
  }, // Route for the bus
});

module.exports = mongoose.model('Bus', busSchema);
