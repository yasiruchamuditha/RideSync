//db.js
// Initialize MongoDB connection using Mongoose
import mongoose from 'mongoose';

// MongoDB connection string
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://chamudithawijesinghe23:ir3YLOHvejRNFRPH@ridesync.t5ls2.mongodb.net/?retryWrites=true&w=majority&appName=RIDESYNC';

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

