import Booking from '../models/Booking.js'; // Adjust the import path as necessary
import Schedule from '../models/Schedule.js'; // Adjust the import path as necessary

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { userId, scheduleId, seats, paymentMethod, amount } = req.body;

        // Find the schedule
        const schedule = await Schedule.findById(scheduleId);
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
            return res.status(400).json({ message: 'Some of the seats are already booked.' });
        }

        // Update the seat layout and available seats
        schedule.seatLayout = schedule.seatLayout.map(seatStatus => {
            if (seats.includes(seatStatus.seatNumber)) {
                seatStatus.seatAvailableState = 'Booked';
            }
            return seatStatus;
        });
        schedule.availableSeats -= seats.length;

        await schedule.save();

        // Create the booking
        const newBooking = new Booking({
            userId,
            scheduleId,
            bookingSeats: seats,
            paymentMethod,
            amount,
            paymentStatus: 'Completed',
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId').populate('scheduleId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('userId').populate('scheduleId');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error: error.message });
    }
};

// Update booking by ID
export const updateBookingById = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
};

// Delete booking by ID
export const deleteBookingById = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
};