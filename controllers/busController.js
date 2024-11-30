//busController.js
// Load Bus model
import Bus from'../models/Bus.js';

// Create a new bus
export const createBus = async (req, res) => {
  try {
    // Get the bus details from the request body
    const {
      ntcRegistrationNumber,
      conductorNtcRegistrationNumber,
      driverNtcRegistrationNumber,
      busNumber,
      capacity,
      route,
      routeNo,
    } = req.body;

    // Check if the bus already exists
    const newBus = new Bus({
      ntcRegistrationNumber,
      conductorNtcRegistrationNumber,
      driverNtcRegistrationNumber,
      busNumber,
      capacity,
      route,
      routeNo,
    });

    // Save the bus details
    await newBus.save();
    res.status(201).json({ message: 'Bus created successfully', bus: newBus });
    // Catch any errors and send the error message
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all buses Details
export const getAllBuses = async (req, res) => {
  try {// Fetch all the bus details from the database
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (err) {// Catch any errors and send the error message
    res.status(500).json({ error: err.message });
  }
};

// Get a bus Details by ID
export const getBusById = async (req, res) => {
  try {// Get the bus ID from the request parameters
    const { id } = req.params;
    const bus = await Bus.findById(id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json(bus);
  } catch (err) {// Catch any errors and send the error message
    res.status(500).json({ error: err.message });
  }
};

// Update a bus Details
export const updateBus = async (req, res) => {
  try {// Get the bus ID from the request parameters
    const { id } = req.params;
    // Find the bus by ID and update the bus details
    const updatedBus = await Bus.findByIdAndUpdate(id, req.body, { new: true });
    // If the bus details are not found
    if (!updatedBus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json({ message: 'Bus updated successfully', bus: updatedBus });
  } catch (err) {
    // Catch any errors and send the error message
    res.status(500).json({ error: err.message });
  }
};

// Delete a bus Details
export const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;// Get the bus ID from the request parameters
    const deletedBus = await Bus.findByIdAndDelete(id);// Find the bus by ID and delete the bus
    if (!deletedBus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (err) {// Catch any errors and send the error message
    res.status(500).json({ error: err.message });
  }
};
