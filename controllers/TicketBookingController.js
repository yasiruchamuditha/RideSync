import TicketBooking from '../models/TicketBooking.js'; // Adjust the import path as necessary
import Schedule from '../models/Schedule.js'; // Adjust the import path as necessary
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

// Get all bookings
export const getAllTicketBookings = async (req, res) => {
    try {
        const Ticketbookings = await TicketBooking.find().populate('userId').populate('scheduleId');
        res.status(200).json(Ticketbookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Ticket bookings', error: error.message });
    }
};

// Get booking by ID
export const getTicketBookingById = async (req, res) => {
    try {
        const Ticketbooking = await TicketBooking.findById(req.params.id).populate('userId').populate('scheduleId');
        if (!Ticketbooking) {
            return res.status(404).json({ message: 'Ticket Booking not found' });
        }
        res.status(200).json(Ticketbooking);
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
        // The booking object in the response contains the updated booking details
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