import express from 'express';
import { addRoutes, getAllRoutes, assignBusToRoute, addManualRoute, addStops } from '../controllers/routeController.js';

const router = express.Router();

// Add predefined routes
router.post('/add-predefined', addRoutes);

// Add a manual route
router.post('/add-manual', addManualRoute);

// Add stops to an existing route
router.post('/add-stops', addStops);

// Get all routes
router.get('/', getAllRoutes);

// Assign bus to a route
router.post('/assign-bus', assignBusToRoute);

export default router;
