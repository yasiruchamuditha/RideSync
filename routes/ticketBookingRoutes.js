import express from 'express';
import { createTicketBooking, getAllTicketBookings, getTicketBookingById, updateTicketBookingById, deleteTicketBookingById } from '../controllers/TicketBookingController.js'; // Adjust the import path as necessary

const router = express.Router();

// Create a new booking
router.post('/', createTicketBooking);

// Get all bookings
router.get('/', getAllTicketBookings);

// Get booking by ID
router.get('/:id', getTicketBookingById);

// Update booking by ID
router.put('/:id', updateTicketBookingById);

// Delete booking by ID
router.delete('/:id', deleteTicketBookingById);

export default router;