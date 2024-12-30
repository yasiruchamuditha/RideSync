import express from 'express';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';
import { getAllRoutes  } from '../controllers/routeController.js';
import { getBookingsByUserId } from '../controllers/TicketBookingController.js'; 

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Commuter
 *   description: Commuter management API for RIDESYNC
 */

/**
 * @swagger
 * /api/commuter/routes:
 *   get:
 *     summary: Get available routes for commuters
 *     tags: [Commuter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available routes for commuters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   routeNumber:
 *                     type: string
 *                     example: "101"
 *                   routeName:
 *                     type: string
 *                     example: "Main Street"
 *                   startCity:
 *                     type: string
 *                     example: "City A"
 *                   endCity:
 *                     type: string
 *                     example: "City B"
 *                   routeType:
 *                     type: string
 *                     example: "ExpressWay"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get('/routes', authenticate, authorizeRole, getAllRoutes);

/**
 * @swagger
 * /api/commuter/booking/{userId}:
 *   get:
 *     summary: Get bookings by user ID
 *     tags: [Commuter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of bookings for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bookingId:
 *                     type: string
 *                     example: "12345"
 *                   routeNumber:
 *                     type: string
 *                     example: "101"
 *                   bookingDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-01T10:00:00Z"
 *                   status:
 *                     type: string
 *                     example: "Confirmed"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get('/booking/:userId', authenticate, getBookingsByUserId);

export default router;