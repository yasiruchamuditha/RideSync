//routes/operatorRoutes.js
import express from 'express';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Operator-only routes
// Add a new route
router.post('/routes', authenticate, authorizeRole(['operator']), (req, res) => {
    res.json({ message: 'Route added successfully (Example)' });
});

export default router;
