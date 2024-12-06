//adminRoutes.js
import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/adminController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin-only routes
router.get('/users', authenticate, authorizeRole(['admin']), getAllUsers); // Get all users
router.get('/users/:id', authenticate, authorizeRole(['admin']), getUserById); // Get user by ID
router.put('/users/:id', authenticate, authorizeRole(['admin']), updateUser); // Update user
router.delete('/users/:id', authenticate, authorizeRole(['admin']), deleteUser); // Delete user

export default router;
