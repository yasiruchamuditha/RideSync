import express from 'express';
import { 
  createTicketBooking, 
  getAllTicketBookings, 
  getTicketBookingById, 
  updateTicketBookingById, 
  deleteTicketBookingById 
} from '../controllers/TicketBookingController.js'; 
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new booking
router.post('/', authenticate, createTicketBooking);

// Get all bookings
router.get('/', authenticate, authorizeRole(['admin']), getAllTicketBookings);

// Get booking by ID
router.get('/:id', authenticate, authorizeRole(['admin']), getTicketBookingById);

// Update booking by ID
router.put('/:id', authenticate, authorizeRole(['admin']), updateTicketBookingById);

// Delete booking by ID
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteTicketBookingById);

export default router;