//controller/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../middlewares/authMiddleware.js';

// Utility function to generate a JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '6h' }); // Token expires in 6 hours
};

// Signup - Create a new user
export const signup = async (req, res) => {
  const { name, email, password, role, mobile } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user with the hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      mobile,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, name: user.name, role: user.role, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login - Authenticate a user and generate a token
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare the entered password with the hashed password in the database
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate a token and return user details
    const token = generateToken(user._id, user.role);
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, role: user.role, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
