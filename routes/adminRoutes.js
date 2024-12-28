//routes/adminRoutes.js
import express from 'express';
import { getAllUsers,getAllOperators, getUserById, updateUser, deleteUser } from '../controllers/adminController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin-only routes
// Get all users
router.get('/users', authenticate, authorizeRole(['admin']), getAllUsers); 

//Get all user based user role [operator role]
router.get('/operators', authenticate, authorizeRole(['admin']), getAllOperators); 

// Get user by ID
router.get('/users/:id', authenticate, authorizeRole(['admin']), getUserById);

// Update user
router.put('/users/:id', authenticate, authorizeRole(['admin']), updateUser); 

// Delete user
router.delete('/users/:id', authenticate, authorizeRole(['admin']), deleteUser); 

export default router;
