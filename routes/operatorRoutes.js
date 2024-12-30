import express from 'express';
import { searchSchedulesByBusIdAndDate,createSchedule } from '../controllers/scheduleController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';
import { getBusByNtcRegNumber } from '../controllers/busController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Operator
 *   description: Operator management API for RIDESYNC
 */

/**
 * @swagger
 * /api/operator/routes:
 *   post:
 *     summary: Add a new route
 *     tags: [Operator]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeName:
 *                 type: string
 *                 description: The name of the route
 *                 example: Route 101
 *               startCity:
 *                 type: string
 *                 description: The starting city of the route
 *                 example: City A
 *               endCity:
 *                 type: string
 *                 description: The ending city of the route
 *                 example: City B
 *               routeType:
 *                 type: string
 *                 description: The type of the route
 *                 example: Normalway
 *     responses:
 *       201:
 *         description: Route added successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.post('/routes', authenticate, authorizeRole(['operator']), (req, res) => {
    res.json({ message: 'Route added successfully (Example)' });
});

/**
 * @swagger
 * /api/operator/searchbus:
 *   post:
 *     summary: Search schedules by bus NTC registration number and departure date
 *     tags: [Operator]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busId:
 *                 type: string
 *                 description: The NTC registration number of the bus
 *                 example: NTC12345
 *               departureDate:
 *                 type: string
 *                 format: date
 *                 description: The departure date of the bus
 *                 example: 2023-10-15
 *     responses:
 *       200:
 *         description: Schedules retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
// Search schedules by bus NTC registration number and departure date
router.post('/searchbus', authenticate, searchSchedulesByBusIdAndDate);


/**
 * @swagger
 * /api/operator/ntc/{ntcRegNumber}:
 *   get:
 *     summary: Get bus details by NTC registration number
 *     tags: [Operator]
 *     parameters:
 *       - in: path
 *         name: ntcRegNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The NTC registration number of the bus
 *     responses:
 *       200:
 *         description: Bus details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Server error
 */
router.get('/ntc/:ntcRegNumber', authenticate, getBusByNtcRegNumber);

router.post('/schedules', authenticate, authorizeRole(['operator']), createSchedule);

export default router;