import express from 'express';
import {
  createFound,
  getAllFound,
  getFoundById,
  updateFoundById,
  deleteFoundById,
  upload
} from '../controllers/foundController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route for creating a found item report
router.post('/', upload.array('photos', 4),authenticate, createFound); // Max 4 files

// Get all found item reports (any role)
router.get('/', authenticate, getAllFound);

// Get found item report by ID (any role)
router.get('/:id', authenticate, getFoundById);

// Update found item report by ID (admin or the user who created the report)
router.put('/:id', authenticate,authorizeRole(['admin']), updateFoundById);

// Delete found item report by ID (admin only)
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteFoundById);

export default router;
