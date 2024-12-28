//routes/busRoutes.js
//Bus Routes for RIDESYNC
import express from 'express';
// Importing the busController
import { createBus,getAllBuses,getBusById,updateBus,deleteBus,updateBusByNtcRegNumber,getBusByNtcRegNumber,deleteBusByNtcRegNumber } from '../controllers/busController.js';

// Defining the router
const router = express.Router();
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

// Swagger API Documentation
/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: Bus management API for RIDESYNC
 */

// Create a new bus
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
router.post('/',authenticate, createBus);

// Get all buses
/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Get all buses
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: List of all buses Details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 *       500:
 *         description: Server error
 */
router.get('/',authenticate, getAllBuses);

// Get a bus by ID
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
router.get('/:id',authenticate, getBusById);

// Update a bus Details
/**
 * @swagger
 * /api/buses/{id}:
 *   put:
 *     summary: Update a bus
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
router.put('/:id',authenticate, updateBus);

// Delete a bus Details
/**
 * @swagger
 * /api/buses/{id}:
 *   delete:
 *     summary: Delete a bus
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
//router.delete('/:id',authenticate,authorizeRole(['admin']), deleteBus);

// Update a bus by NTC registration number
router.put('/:ntcRegNumber',authenticate, updateBusByNtcRegNumber);

// Get a bus by NTC registration number
router.get('/:ntcRegNumber',authenticate, getBusByNtcRegNumber);

// Delete a bus by NTC Registration Number
router.delete('/:ntcRegNumber', authenticate, authorizeRole(['admin']), deleteBusByNtcRegNumber);

export default router;
