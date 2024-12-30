import express from 'express';
import { createSchedule, getAllSchedules, getScheduleById, updateScheduleById, deleteScheduleById, searchSchedules, getSeatLayoutByScheduleId,searchSchedulesByBusIdAndDate } from '../controllers/scheduleController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: Schedule management API for RIDESYNC
 */

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Create a new schedule
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.post('/', authenticate, authorizeRole(['admin']), createSchedule);

/**
 * @swagger
 * /api/schedules:
 *   get:
 *     summary: Get all schedules
 *     tags: [Schedules]
 *     responses:
 *       200:
 *         description: List of all schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Schedule'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', authenticate, getAllSchedules);

/**
 * @swagger
 * /api/schedules/{id}:
 *   get:
 *     summary: Get a schedule by ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The schedule ID
 *     responses:
 *       200:
 *         description: Schedule details by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authenticate, getScheduleById);

/**
 * @swagger
 * /api/schedules/{id}:
 *   put:
 *     summary: Update a schedule by ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authenticate, authorizeRole(['admin']), updateScheduleById);

/**
 * @swagger
 * /api/schedules/{id}:
 *   delete:
 *     summary: Delete a schedule by ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The schedule ID
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteScheduleById);

/**
 * @swagger
 * /api/schedules/search:
 *   post:
 *     summary: Search schedules by start city, end city, and date
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startCity:
 *                 type: string
 *                 description: The city where the bus starts its journey
 *               endCity:
 *                 type: string
 *                 description: The city where the bus ends its journey
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the schedule
 *     responses:
 *       200:
 *         description: List of schedules matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Schedule'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/search', authenticate, searchSchedules);

/**
 * @swagger
 * /api/schedules/{id}/seats:
 *   get:
 *     summary: Get seat layout by schedule ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The schedule ID
 *     responses:
 *       200:
 *         description: Seat layout details by schedule ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 seatLayout:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       seatNumber:
 *                         type: string
 *                       bookedBy:
 *                         type: string
 *                         format: objectId
 *                       position:
 *                         type: string
 *                       isBooked:
 *                         type: boolean
 *                       seatAvailableState:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Server error
 */
router.get('/:id/seats', authenticate, getSeatLayoutByScheduleId);

/**
 * @swagger
 * /api/schedules/searchbus:
 *   post:
 *     summary: Search schedules by bus NTC registration number and departure date
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busId:
 *                 type: string
 *                 description: The ID of the bus
 *                 example: "5f8d0d55b54764421b7156c7"
 *               departureDate:
 *                 type: string
 *                 format: date
 *                 description: The departure date (YYYY-MM-DD)
 *                 example: "2024-12-30"
 *     responses:
 *       200:
 *         description: List of schedules matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The schedule ID
 *                     example: "5f8d0d55b54764421b7156c8"
 *                   busId:
 *                     type: object
 *                     description: The bus details
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The bus ID
 *                         example: "5f8d0d55b54764421b7156c7"
 *                       ntcRegNumber:
 *                         type: string
 *                         description: The NTC registration number of the bus
 *                         example: "NTC12345"
 *                   route:
 *                     type: object
 *                     description: The route details
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The route ID
 *                         example: "5f8d0d55b54764421b7156c9"
 *                       routeName:
 *                         type: string
 *                         description: The name of the route
 *                         example: "Route 101"
 *                   departureDate:
 *                     type: string
 *                     format: date
 *                     description: The departure date
 *                     example: "2024-12-30"
 *                   departureTime:
 *                     type: string
 *                     description: The departure time
 *                     example: "08:00 AM"
 *                   arrivalTime:
 *                     type: string
 *                     description: The arrival time
 *                     example: "10:00 AM"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

// Search schedules by bus NTC registration number and departure date
router.post('/searchbus', authenticate, searchSchedulesByBusIdAndDate);

export default router;