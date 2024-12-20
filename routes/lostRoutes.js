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

const router = express.Router();

// Public route for creating a lost item report
router.post('/', upload.array('photos', 4), createLost); // Max 4 files

// Get all lost item reports
router.get('/', getAllLost);

// Get lost item report by ID
router.get('/:id', getLostById);

// Update lost item report by ID
router.put('/:id', updateLostById);

// Delete lost item report by ID
router.delete('/:id', deleteLostById);

export default router;