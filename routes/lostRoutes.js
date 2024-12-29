import express from 'express';
import { createLost, getAllLost, getLostById, updateLostById, deleteLostById, upload } from '../controllers/lostController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Lost
 *   description: Lost item management API for RIDESYNC
 */

/**
 * @swagger
 * /api/lost:
 *   post:
 *     summary: Create a new lost item report
 *     tags: [Lost]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contact:
 *                 type: string
 *               email:
 *                 type: string
 *               busNumber:
 *                 type: string
 *               route:
 *                 type: string
 *               lostPlace:
 *                 type: string
 *               size:
 *                 type: string
 *               color:
 *                 type: string
 *               type:
 *                 type: string
 *               note:
 *                 type: string
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Lost item report created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', upload.array('photos', 4), authenticate, createLost);

/**
 * @swagger
 * /api/lost:
 *   get:
 *     summary: Get all lost item reports
 *     tags: [Lost]
 *     responses:
 *       200:
 *         description: List of all lost item reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lost'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', authenticate, getAllLost);

/**
 * @swagger
 * /api/lost/{id}:
 *   get:
 *     summary: Get a lost item report by ID
 *     tags: [Lost]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lost item report ID
 *     responses:
 *       200:
 *         description: Lost item report details by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lost'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Lost item report not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authenticate, getLostById);

/**
 * @swagger
 * /api/lost/{id}:
 *   put:
 *     summary: Update a lost item report by ID
 *     tags: [Lost]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lost item report ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lost'
 *     responses:
 *       200:
 *         description: Lost item report updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Lost item report not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authenticate, authorizeRole(['admin']), updateLostById);

/**
 * @swagger
 * /api/lost/{id}:
 *   delete:
 *     summary: Delete a lost item report by ID
 *     tags: [Lost]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lost item report ID
 *     responses:
 *       200:
 *         description: Lost item report deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Lost item report not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteLostById);

export default router;