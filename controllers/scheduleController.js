//scheduleController.js
import Schedule from '../models/Schedule.js';
import seatLayout from '../utils/seatLayout.js';

// Create a new schedule
export const createSchedule = async (req, res) => {
  try {
    const {
      busId,
      busRouteType,
      route,
      startCity,
      departureDate,
      departureTime,
      endCity,
      arrivalDate,
      arrivalTime,
      estimatedTime,
      estimatedDistance,
      ticketPrice,
      totalSeats = 50, // Default to 50 seats if not provided
      rows = 10,       // Default to 10 rows if not provided
    } = req.body;

    // Strip time from dates
    const strippeddepDate = new Date(departureDate);
    strippeddepDate.setUTCHours(0, 0, 0, 0); // Set time to midnight UTC

    const strippedarrivalDate = new Date(arrivalDate);
    strippedarrivalDate.setUTCHours(0, 0, 0, 0); // Set time to midnight UTC

    // Generate seat layout dynamically
    const seats = seatLayout(totalSeats, rows);

    const newSchedule = new Schedule({
      busId,
      busRouteType,
      route,
      startCity,
      departureDate: strippeddepDate,
      departureTime,
      endCity,
      arrivalDate: strippedarrivalDate,
      arrivalTime,
      estimatedTime,
      estimatedDistance,
      ticketPrice,
      availableSeats: totalSeats,
      seatLayout: seats,
    });

    await newSchedule.save();
    res.status(201).json({ message: 'New Schedule created successfully', Schedule: newSchedule });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all schedules
 */
export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get schedule by ID
 */
export const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update schedule by ID
 */
export const updateScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json(updatedSchedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete schedule by ID
 */
export const deleteScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSchedule = await Schedule.findByIdAndDelete(id);
    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Search schedules by start city, end city, and date
 */
export const searchSchedules = async (req, res) => {
  try {
    const { startCity, endCity, departureDate } = req.body;
    // Find schedules that match the start city, end city, and departure date
    const schedules = await Schedule.find({
      startCity,
      endCity,
      departureDate: new Date(departureDate).setUTCHours(0, 0, 0, 0) // Match only the date part
    }).populate('busId');

    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};