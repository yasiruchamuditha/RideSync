import express from 'express';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

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

export default router;