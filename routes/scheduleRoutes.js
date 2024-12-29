import express from 'express';
import { createSchedule, getAllSchedules, getScheduleById, updateScheduleById, deleteScheduleById, searchSchedules, getSeatLayoutByScheduleId,searchSchedulesByBusNtc } from '../controllers/scheduleController.js';
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
 *   get:
 *     summary: Search schedules by bus NTC registration number and departure date
 *     tags: [Schedules]
 *     parameters:
 *       - in: query
 *         name: busNtc
 *         schema:
 *           type: string
 *         required: true
 *         description: The bus NTC registration number
 *       - in: query
 *         name: departureDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The departure date of the schedule
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
// Search schedules by bus NTC registration number and departure date
router.get('/searchbus', authenticate, searchSchedulesByBusNtc);

export default router;