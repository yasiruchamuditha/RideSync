//scheduleRoutes.js
import express from 'express';
import {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateScheduleById,
  deleteScheduleById
} from '../controllers/scheduleController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new schedule
router.post('/', authenticate, authorizeRole(['admin']), createSchedule);

// Get all schedules
router.get('/', authenticate, authorizeRole(['admin']), getAllSchedules);

// Get schedule by ID
router.get('/:id', authenticate, authorizeRole(['admin']), getScheduleById);

// Update schedule by ID
router.put('/:id', authenticate, authorizeRole(['admin']), updateScheduleById);

// Delete schedule by ID
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteScheduleById);

export default router;