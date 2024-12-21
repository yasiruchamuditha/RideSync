import express from 'express';
import {
  createFound,
  getAllFound,
  getFoundById,
  updateFoundById,
  deleteFoundById
} from '../controllers/FoundController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new found item report (any role)
router.post('/', authenticate, createFound);

// Get all found item reports (any role)
router.get('/', authenticate, getAllFound);

// Get found item report by ID (any role)
router.get('/:id', authenticate, getFoundById);

// Update found item report by ID (admin or the user who created the report)
router.put('/:id', authenticate, updateFoundById);

// Delete found item report by ID (admin only)
router.delete('/:id', authenticate, authorizeRole(['admin']), deleteFoundById);

export default router;
