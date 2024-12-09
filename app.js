import dotenv from 'dotenv'; // Import the dotenv module
import cookieParser from 'cookie-parser'; // Import the cookie-parser module
import express from 'express'; // Import the express module
import { connectDB } from './config/db.js'; // Import the connectDB function
import busRoutes from './routes/busRoutes.js'; // Import the busRoutes
import authRoutes from './routes/authRoutes.js'; // Import the authRoutes
import adminRoutes from './routes/adminRoutes.js'; // Import the adminRoutes
import scheduleRoutes from './routes/scheduleRoutes.js'; // Import the scheduleRoutes
import routeRoutes from './routes/routeRoutes.js'; // Import the routeRoutes

// Load environment variables BEFORE using them
dotenv.config();

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined. Check your .env file.');
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Create an Express app
const app = express();

// Use middlewares
app.use(express.json()); // Handle JSON data
app.use(cookieParser()); // Handle cookies

// Use routes
app.use('/api/buses', busRoutes);
app.use('/api/auth', authRoutes); // Public routes (signup, login)
app.use('/api/admin', adminRoutes); // Admin routes (get users, delete user)
app.use('/api/schedules', scheduleRoutes); // Schedule routes (get schedules, create schedule)
app.use('/api/routes', routeRoutes); // Route routes (get routes, create route)

// Export the app
export default app;
