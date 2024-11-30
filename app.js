import dotenv from 'dotenv';// Import the dotenv module
import cookieParser from 'cookie-parser';// Import the cookie-parser module
import express from 'express';// Import the express module
import {connectDB} from './config/db.js';// Import the connectDB function
import busRoutes from './routes/busRoutes.js';// Import the busRoutes


// Connect to MongoDB
connectDB();
// Load environment variables
dotenv.config();
// Create an Express app
const app = express();
// Use the Express app to handle JSON data
app.use(express.json());
// Use the Express app to handle form data
app.use(cookieParser());
// Use the Express app to handle the bus routes
app.use('/api/buses', busRoutes);

// Define the default route
app.listen(5000, () => {
  console.log('server is running on port 5000!')
});