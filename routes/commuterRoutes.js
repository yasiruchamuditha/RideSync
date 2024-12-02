import express from 'express';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/routes', authenticate, authorizeRole(['commuter']), (req, res) => {
    res.json({ message: 'Available routes (Example)' });
});

export default router;
