import express from 'express';
import { createFound, getAllFound, getFoundById, updateFoundById, deleteFoundById, upload } from '../controllers/foundController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Found
 *   description: Found item management API for RIDESYNC
 */

/**
 * @swagger
 * /api/found:
 *   post:
 *     summary: Create a new found item report
 *     tags: [Found]
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
 *               foundPlace:
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
 *         description: Found item report created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', upload.array('photos', 4), authenticate, createFound);

/**
 * @swagger
 * /api/found:
 *   get:
 *     summary: Get all found item reports
 *     tags: [Found]
 *     responses:
 *       200:
 *         description: List of all found item reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Found'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', authenticate, getAllFound);

/**
 * @swagger
 * /api/found/{id}:
 *   get:
 *     summary: Get a found item report by ID
 *     tags: [Found]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The found item report ID
 *     responses:
 *       200:
 *         description: Found item report details by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Found'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Found item report not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authenticate, getFoundById);

/**
 * @swagger
 * /api/found/{id}:
 *   put:
 *     summary: Update a found item report by ID
 *     tags: [Found]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The found item report ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Found'
 *     responses:
 *       200:
 *         description: Found item report updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Found item report not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authenticate, authorizeRole(['admin']), updateFoundById);

/**
 * @swagger
 * /api/found/{id}:
 *   delete:
 *     summary: Delete a found item report by ID
 *     tags: [Found]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The found item report ID
 *     responses:
 *       200:
 *         description: Found item report deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Found item report not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteFoundById);

export default router;