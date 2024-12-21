//scheduleRoutes.js
import express from 'express';
import { createSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

// Route to create a new schedule
router.post('/', createSchedule);

export default router;