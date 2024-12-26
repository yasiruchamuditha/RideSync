import express from 'express';
import {
  addRoutes,
  getAllRoutes,
  addManualRoute,
  updateRoute,
  deleteRoute,
  getRouteById,
} from '../controllers/routeController.js';

import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add predefined routes
router.post('/add-predefined', authenticate, addRoutes);

// Add a manual route
router.post('/add-manual', authenticate, addManualRoute);

// Get all routes
router.get('/', authenticate, getAllRoutes);

// Get a route by ID
router.get('/:id', authenticate,getRouteById);

// Update a route
router.put('/update-route', authenticate, updateRoute);

// Delete a route
router.delete('/delete-route', authenticate, authorizeRole(['admin']), deleteRoute);

export default router;