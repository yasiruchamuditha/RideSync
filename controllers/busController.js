//busController.js
const Bus = require('../models/Bus');

// Create a new bus
exports.createBus = async (req, res) => {
  try {
    const {
      ntcRegistrationNumber,
      conductorNtcRegistrationNumber,
      driverNtcRegistrationNumber,
      busNumber,
      capacity,
      route,
      routeNo,
    } = req.body;

    const newBus = new Bus({
      ntcRegistrationNumber,
      conductorNtcRegistrationNumber,
      driverNtcRegistrationNumber,
      busNumber,
      capacity,
      route,
      routeNo,
    });

    await newBus.save();
    res.status(201).json({ message: 'Bus created successfully', bus: newBus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all buses Details
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a bus Details by ID
exports.getBusById = async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await Bus.findById(id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a bus Details
exports.updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBus = await Bus.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json({ message: 'Bus updated successfully', bus: updatedBus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a bus Details
exports.deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBus = await Bus.findByIdAndDelete(id);
    if (!deletedBus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
