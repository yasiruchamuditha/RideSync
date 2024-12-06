import Schedule from '../models/Schedule.js';
import seatLayout from '../utils/seatLayout.js';

// Create a new schedule
export const createSchedule = async (req, res) => {
  try {
    const {
      busId,
      busRouteType,
      date,
      startCity,
      endCity,
      estimatedTime,
      ticketPrice,
      totalSeats = 50, // Default to 50 seats if not provided
      rows = 10,       // Default to 10 rows if not provided
    } = req.body;

    // Generate seat layout dynamically
    const seats = seatLayout(totalSeats, rows);

    const newSchedule = new Schedule({
      busId,
      busRouteType,
      date,
      startCity,
      endCity,
      estimatedTime,
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
