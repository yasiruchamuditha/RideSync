import express from 'express';
import { createTicketBooking, getAllTicketBookings, getTicketBookingById, updateTicketBookingById, deleteTicketBookingById } from '../controllers/TicketBookingController.js'; // Adjust the import path as necessary
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new booking
router.post('/', createTicketBooking, authenticate, authorizeRole(['commuter']));

// Get all bookings
router.get('/', getAllTicketBookings,authenticate, authorizeRole(['admin']));

// Get booking by ID
router.get('/:id', getTicketBookingById, authenticate, authorizeRole(['admin']));

// Update booking by ID
router.put('/:id', updateTicketBookingById, authenticate, authorizeRole(['admin']));

// Delete booking by ID
router.delete('/:id', deleteTicketBookingById, authenticate, authorizeRole(['admin']));

export default router;