import express from 'express';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

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
 *     responses:
 *       200:
 *         description: List of available routes for commuters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Available routes (Example)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.get('/routes', authenticate, authorizeRole(['commuter']), (req, res) => {
    res.json({ message: 'Available routes (Example)' });
});

export default router;