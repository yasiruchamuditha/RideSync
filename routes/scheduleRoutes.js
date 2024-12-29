//routes/scheduleRoutes.js
import express from 'express';
import { createSchedule,getAllSchedules,getScheduleById,updateScheduleById,deleteScheduleById,searchSchedules,getSeatLayoutByScheduleId } from '../controllers/scheduleController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';
  

const router = express.Router();

// Create a new schedule
router.post('/', authenticate, authorizeRole(['admin']), createSchedule);

// Get all schedules
router.get('/', authenticate, getAllSchedules);

// Get schedule by ID
router.get('/:id', authenticate, getScheduleById);

// Update schedule by ID
router.put('/:id', authenticate, authorizeRole(['admin']), updateScheduleById);

// Delete schedule by ID
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteScheduleById);

// Search schedules by start city, end city, and date
router.post('/search', authenticate, searchSchedules);

// Get seat layout by schedule ID
router.get('/:id/seats', authenticate, getSeatLayoutByScheduleId);

export default router;