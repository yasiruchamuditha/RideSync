//controller/busController.js
import Bus from'../models/Bus.js';
import Route from'../models/Route.js';

// Create a new bus
export const createBus = async (req, res) => {
  try {
    // Get the bus details from the request body
    const {
      ntcRegNumber,
      conductorNtcRegNumber,
      driverNtcRegNumber,
      busNumber,
      capacity,
      busType,
      sector,
      route,
      routeNo,
      operator,
    } = req.body;

    // Check if the bus already exists
    const newBus = new Bus({
      ntcRegNumber,
      conductorNtcRegNumber,
      driverNtcRegNumber,
      busNumber,
      capacity,
      busType,
      sector,
      route,
      routeNo,
      operator,
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
    const buses = await Bus.find()
      .populate('operator', 'name');// Send the bus details as a response
    // .populate('route', 'routeName')// Populate the route details
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


// Get a bus by NTC registration number
export const getBusByNtcRegNumber = async (req, res) => {
  try {
    const { ntcRegNumber } = req.params;
    const bus = await Bus.findOne({ ntcRegNumber });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a bus by NTC registration number
export const updateBusByNtcRegNumber = async (req, res) => {
  try {
    const { ntcRegNumber } = req.params;
    const updatedBus = await Bus.findOneAndUpdate({ ntcRegNumber }, req.body, { new: true });
    if (!updatedBus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json({ message: 'Bus updated successfully', bus: updatedBus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a bus by NTC Registration Number
export const deleteBusByNtcRegNumber = async (req, res) => {
  try {
    const { ntcRegNumber } = req.params;
    const bus = await Bus.findOneAndDelete({ ntcRegNumber });

    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    console.error('Error deleting bus:', error);
    res.status(500).json({ message: 'Server error' });
  }
};