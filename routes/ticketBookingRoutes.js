import express from 'express';
import { 
  createTicketBooking, 
  getAllTicketBookings, 
  getTicketBookingById, 
  updateTicketBookingById, 
  deleteTicketBookingById,
  getBookingsByUserId
} from '../controllers/TicketBookingController.js'; 
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: TicketBookings
 *   description: Ticket booking management
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new booking
 *     tags: [TicketBookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               eventId:
 *                 type: string
 *               seats:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

// Create a new booking
router.post('/', authenticate, createTicketBooking);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all bookings
 *     tags: [TicketBookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all bookings
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

// Get all bookings
router.get('/', authenticate, authorizeRole(['admin']), getAllTicketBookings);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [TicketBookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Booking not found
 */

// Get booking by ID
router.get('/:id', authenticate, authorizeRole(['admin']), getTicketBookingById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update booking by ID
 *     tags: [TicketBookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seats:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Booking not found
 */

// Update booking by ID
router.put('/:id', authenticate, authorizeRole(['admin']), updateTicketBookingById);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete booking by ID
 *     tags: [TicketBookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Booking not found
 */

// Delete booking by ID
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteTicketBookingById);

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get bookings by user ID
 *     tags: [TicketBookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings for the user
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User or bookings not found
 */
// Get bookings by user ID
router.get('/user/:userId', authenticate, getBookingsByUserId);

export default router;