//lostRoutes.js
import express from 'express';
import {
  createLost,
  getAllLost,
  getLostById,
  updateLostById,
  deleteLostById,
  upload
} from '../controllers/lostController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route for creating a lost item report
router.post('/', upload.array('photos', 4),authenticate, createLost); // Max 4 files

// Get all lost item reports
router.get('/',authenticate, getAllLost);

// Get lost item report by ID
router.get('/:id',authenticate, getLostById);

// Update lost item report by ID
router.put('/:id',authenticate,authorizeRole(['admin']), updateLostById);

// Delete lost item report by ID
router.delete('/:id',authenticate,authorizeRole(['admin']), deleteLostById);

export default router;