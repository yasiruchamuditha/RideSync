import dotenv from 'dotenv'; // Import the dotenv module
import express from 'express'; // Import the express module
import cookieParser from 'cookie-parser'; // Import the cookie-parser module
import cors from 'cors'; // Import CORS for handling cross-origin requests
import { connectDB } from './config/db.js'; // Import the connectDB function
import busRoutes from './routes/busRoutes.js'; // Import the busRoutes
import authRoutes from './routes/authRoutes.js'; // Import the authRoutes
import adminRoutes from './routes/adminRoutes.js'; // Import the adminRoutes
import operatorRoutes from './routes/operatorRoutes.js'; // Import the operatorRoutes
import commuterRoutes from './routes/commuterRoutes.js'; // Import the commuterRoutes
import scheduleRoutes from './routes/scheduleRoutes.js'; // Import the scheduleRoutes
import routeRoutes from './routes/routeRoutes.js'; // Import the routeRoutes
import foundRoutes from './routes/foundRoutes.js'; // Import the foundRoutes
import lostRoutes from './routes/lostRoutes.js'; // Import the lostRoutes
import bookingRoutes from './routes/ticketBookingRoutes.js'; // Import the bookingRoutes
import swaggerUi from 'swagger-ui-express'; // Import swaggerUi
import setupSwagger from './config/swaggerConfig.js'; // Swagger configuration function


// Define the server port
const PORT = process.env.PORT || 5000;

// Load environment variables BEFORE using them
dotenv.config();

// Check if essential environment variables are defined
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined. Check your .env file.');
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Create an Express app
const app = express();

// Enable CORS for your frontend application
app.use(
  cors({
    // origin: [
    //   // 'http://localhost:3000',
    //   'https://bus-ride-sync.vercel.app',
    //   'https://ridesync.yasiru.site', // Added this
    // ],
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true, // Allow cookies and credentials
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  })
);

// app.use(cors()); // Enable CORS

// Middleware
app.use(express.json()); // Handle JSON data
app.use(cookieParser()); // Handle cookies
app.use('/uploads', express.static('uploads')); // Serve uploaded files as static assets

// Swagger UI setup
setupSwagger(app);

// Routes
app.use('/api/buses', busRoutes);
app.use('/api/auth', authRoutes); // Public routes (signup, login)
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/operator', operatorRoutes); // Operator routes
app.use('/api/commuter', commuterRoutes); // Commuter routes
app.use('/api/schedules', scheduleRoutes); // Schedule routes
app.use('/api/routes', routeRoutes); // Route routes
app.use('/api/found', foundRoutes); // Found item routes
app.use('/api/lost', lostRoutes); // Lost item routes
app.use('/api/booking', bookingRoutes); // Ticket booking routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// // Export the app for use in server.js
// export default app;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

