//app.js
import dotenv from 'dotenv'; // Import the dotenv module
import express from 'express'; // Import the express module
import cookieParser from 'cookie-parser'; // Import the cookie-parser module
import cors from 'cors'; // Import CORS for handling cross-origin requests
import { connectDB } from './config/db.js'; // Import the connectDB function
import busRoutes from './routes/busRoutes.js'; // Import the busRoutes
import authRoutes from './routes/authRoutes.js'; // Import the authRoutes
import adminRoutes from './routes/adminRoutes.js'; // Import the adminRoutes
import operatorRoutes from './routes/operatorRoutes.js'; // Import the operatorRoutes
import scheduleRoutes from './routes/scheduleRoutes.js'; // Import the scheduleRoutes
import routeRoutes from './routes/routeRoutes.js'; // Import the routeRoutes
import foundRoutes from './routes/foundRoutes.js'; // Import the foundRoutes
import lostRoutes from './routes/lostRoutes.js'; // Import the lostRoutes
import bookingRoutes from './routes/ticketBookingRoutes.js'; // Import the bookingRoutes
import swaggerUi from 'swagger-ui-express'; // Import swaggerUi
import setupSwagger from './config/swaggerConfig.js'; // Adjust path if needed

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

// Swagger UI setup
setupSwagger(app);

// Enable CORS for your frontend application
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend's URL
  methods: [ 'GET', 'POST','PUT', 'DELETE'], // Allow only GET and POST methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
}));

// Use middlewares
app.use(express.json()); // Handle JSON data
app.use(cookieParser()); // Handle cookies
app.use(cors()); // Enable CORS

// Use routes
app.use('/api/buses', busRoutes);
app.use('/api/auth', authRoutes); // Public routes (signup, login)
app.use('/api/admin', adminRoutes); // Admin routes (get users, delete user)
app.use('/api/operator', operatorRoutes); // Admin routes (get users, delete user)
app.use('/api/schedules', scheduleRoutes); // Schedule routes (get schedules, create schedule)
app.use('/api/routes', routeRoutes); // Route routes (get routes, create route)
app.use('/api/found', foundRoutes); // Found item routes
app.use('/api/lost', lostRoutes);// Lost item routes
app.use('/api/booking', bookingRoutes);// Ticket booking routes
app.use('/uploads', express.static('uploads')); // Serve uploaded files as static assets

// Export the app for use in server.js
export default app;
