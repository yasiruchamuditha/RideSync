//controller/TicketBookingController.js
import TicketBooking from '../models/TicketBooking.js';
import Schedule from '../models/Schedule.js';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new booking
export const createTicketBooking = async (req, res) => {
    try {
        const { userId, scheduleId, seats, paymentType, amount } = req.body;

        // Find the schedule
        const schedule = await Schedule.findById(scheduleId).populate('route');
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        // Check if the seats are available
        const unavailableSeats = seats.filter(seat =>
            schedule.seatLayout.find(
                seatStatus => seatStatus.seatNumber === seat && seatStatus.seatAvailableState === 'Booked'
            )
        );

        if (unavailableSeats.length > 0) {
            return res.status(400).json({ message: 'Seats are already booked.' });
        }

        // Update the seat layout and available seats
        schedule.seatLayout = schedule.seatLayout.map(seatStatus => {
            if (seats.includes(seatStatus.seatNumber)) {
                seatStatus.seatAvailableState = 'Booked';
                seatStatus.isBooked = true;
                seatStatus.bookedBy = userId; // Update bookedBy field 
            }
            return seatStatus;
        });
        schedule.availableSeats -= seats.length;

        await schedule.save();

        const transactionReference = uuidv4();

        // Create the booking
        const newTicketBooking = new TicketBooking({
            userId,
            scheduleId,
            bookingSeats: seats,
            paymentType,
            amount,
            transactionReference,
            paymentStatus: 'Completed',
        });

        await newTicketBooking.save();
        res.status(201).json({ message: 'Ticket Booking created successfully', booking: newTicketBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Ticket booking', error: error.message });
    }
};

// // Create a new booking
// export const createTicketBooking = async (req, res) => {
//     try {
//         const { userId, scheduleId, seats, paymentType, amount } = req.body;

//         // Find the schedule
//         const schedule = await Schedule.findById(scheduleId).populate('route');
//         if (!schedule) {
//             return res.status(404).json({ message: 'Schedule not found' });
//         }

//         // Check if the seats are available
//         const unavailableSeats = seats.filter(seat =>
//             schedule.seatLayout.find(
//                 seatStatus => seatStatus.seatNumber === seat && seatStatus.isBooked
//             )
//         );

//         if (unavailableSeats.length > 0) {
//             return res.status(400).json({ message: 'Seats are already booked.' });
//         }

//         // Update the seat layout and available seats
//         schedule.seatLayout = schedule.seatLayout.map(seatStatus => {
//             if (seats.includes(seatStatus.seatNumber)) {
//                 seatStatus.seatAvailableState = 'Booked';
//                 seatStatus.isBooked = true;
//                 seatStatus.bookedBy = userId; // Update bookedBy field
//             }
//             return seatStatus;
//         });
//         schedule.availableSeats -= seats.length;

//         await schedule.save();

//         const transactionReference = uuidv4();

//         // Create the booking
//         const newTicketBooking = new TicketBooking({
//             userId,
//             scheduleId,
//             bookingSeats: seats,
//             paymentType,
//             amount,
//             transactionReference,
//             paymentStatus: 'Completed',
//         });

//         await newTicketBooking.save();
//         res.status(201).json({ message: 'Ticket Booking created successfully', booking: newTicketBooking });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating Ticket booking', error: error.message });
//     }
// };


// Get all bookings
export const getAllTicketBookings = async (req, res) => {
    try {
        const ticketBookings = await TicketBooking.find()
            .populate('userId');// Populate userId with only the name field
            // .populate('scheduleId'); // Populate scheduleId with only the details field

        res.status(200).json(ticketBookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Ticket bookings', error: error.message });
    }
};

// Get booking by ID
export const getTicketBookingById = async (req, res) => {
    try {
        const ticketBooking = await TicketBooking.findById(req.params.id).populate('userId').populate('scheduleId');
        if (!ticketBooking) {
            return res.status(404).json({ message: 'Ticket Booking not found' });
        }
        res.status(200).json(ticketBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Ticket booking', error: error.message });
    }
};

// Update booking by ID
export const updateTicketBookingById = async (req, res) => {
    try {
        const updatedTicketBooking = await TicketBooking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTicketBooking) {
            return res.status(404).json({ message: 'Ticket Booking not found' });
        }
        res.status(200).json({ message: 'Ticket Booking updated successfully', booking: updatedTicketBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Ticket booking', error: error.message });
    }
};

// Delete booking by ID
export const deleteTicketBookingById = async (req, res) => {
    try {
        const deletedTicketBooking = await TicketBooking.findByIdAndDelete(req.params.id);
        if (!deletedTicketBooking) {
            return res.status(404).json({ message: 'Ticket Booking not found' });
        }
        res.status(200).json({ message: 'Ticket Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Ticket booking', error: error.message });
    }
};

// Get bookings by user ID
export const getBookingsByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      const bookings = await TicketBooking.find({ userId }).populate({
        path: 'scheduleId',
        populate: {
          path: 'route',
          model: 'Route'
        }
      });
  
      if (!bookings.length) {
        return res.status(404).json({ message: 'No bookings found for this user' });
      }
  
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
  };