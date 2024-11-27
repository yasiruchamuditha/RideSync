const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  ntcRegistrationNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  }, //Bus NTC registration number
  conductorNtcRegistrationNumber: { 
    type: String, 
    required: true, 
    trim: true 
  }, // Bus Conductor's NTC registration number
  driverNtcRegistrationNumber: { 
    type: String, 
    required: true, 
    trim: true 
  }, //Bus Driver's NTC registration number
  busNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  }, // Bus's License Register number
  capacity: { 
    type: Number, 
    required: true 
  }, // Bus Total seats
  route: { 
    type: String, 
    required: true, 
    trim: true 
  }, // Route of the bus
  routeNo: { 
    type: String, 
    required: true, 
    trim: true 
  }, // Route of the bus
});

module.exports = mongoose.model('Bus', busSchema);
