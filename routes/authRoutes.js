//authRoutes.js
import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/signup', signup); // Register a new user
router.post('/login', login);   // Login user

export default router;
