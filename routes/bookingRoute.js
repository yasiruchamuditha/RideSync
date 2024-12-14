//booking Route.js
import express from 'express';
import { createBooking, getAllBookings, getBookingById, updateBookingById, deleteBookingById } from '../controllers/bookingController.js'; // Adjust the import path as necessary

const router = express.Router();

// Create a new booking
router.post('/', createBooking);

// Get all bookings
router.get('/', getAllBookings);

// Get booking by ID
router.get('/:id', getBookingById);

// Update booking by ID
router.put('/:id', updateBookingById);

// Delete booking by ID
router.delete('/:id', deleteBookingById);

export default router;
