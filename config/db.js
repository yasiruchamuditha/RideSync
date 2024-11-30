import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect(
      'mongodb+srv://chamudithawijesinghe23:ir3YLOHvejRNFRPH@ridesync.t5ls2.mongodb.net/?retryWrites=true&w=majority&appName=RIDESYNC'
    );
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectDB;
