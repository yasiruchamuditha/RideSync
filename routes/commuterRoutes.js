import express from 'express';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';
import { getAllRoutes  } from '../controllers/routeController.js';

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

export default router;