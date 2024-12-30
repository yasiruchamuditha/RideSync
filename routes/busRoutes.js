// routes/busRoutes.js
import express from 'express';
import {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
  updateBusByNtcRegNumber,
  getBusByNtcRegNumber,
  deleteBusByNtcRegNumber,
} from '../controllers/busController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

export const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: Bus management API for RIDESYNC
 */

/**
 * @swagger
 * /api/buses:
 *   post:
 *     summary: Create a new bus
 *     tags: [Buses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       201:
 *         description: Bus created successfully
 *       500:
 *         description: Server error
 */
router.post('/', authenticate, createBus);

/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Get all buses
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: List of all buses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 *       500:
 *         description: Server error
 */
router.get('/', authenticate, getAllBuses);

/**
 * @swagger
 * /api/buses/{id}:
 *   get:
 *     summary: Get a bus by ID
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bus ID
 *     responses:
 *       200:
 *         description: Bus details by Bus ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authenticate, getBusById);

/**
 * @swagger
 * /api/buses/{id}:
 *   put:
 *     summary: Update a bus by ID
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bus ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authenticate, updateBus);

/**
 * @swagger
 * /api/buses/{id}:
 *   delete:
 *     summary: Delete a bus by ID
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bus ID
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteBus);

/**
 * @swagger
 * /api/buses/ntc/{ntcRegNumber}:
 *   put:
 *     summary: Update a bus by NTC registration number
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: ntcRegNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The NTC registration number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Server error
 */
router.put('/ntc/:ntcRegNumber', authenticate, updateBusByNtcRegNumber);

/**
 * @swagger
 * /api/buses/ntc/{ntcRegNumber}:
 *   get:
 *     summary: Get a bus by NTC registration number
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: ntcRegNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The NTC registration number
 *     responses:
 *       200:
 *         description: Bus details by NTC registration number
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Server error
 */
router.get('/ntc/:ntcRegNumber', authenticate, getBusByNtcRegNumber);

/**
 * @swagger
 * /api/buses/ntc/{ntcRegNumber}:
 *   delete:
 *     summary: Delete a bus by NTC registration number
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: ntcRegNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The NTC registration number
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Server error
 */
router.delete('/ntc/:ntcRegNumber', authenticate, authorizeRole(['admin']), deleteBusByNtcRegNumber);

export default router;