//server.js
import app from './app.js'; // Import the configured Express app
import dotenv from 'dotenv'; // Import dotenv to load environment variables

// Load environment variables
dotenv.config();

// Define the server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
