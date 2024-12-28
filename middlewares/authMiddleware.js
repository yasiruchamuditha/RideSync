//middleware/authMiddleware.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Hash the password before saving
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare passwords during login
export const comparePassword = async (enteredPassword, storedPassword) => {
  return bcrypt.compare(enteredPassword, storedPassword);
};

// Middleware to authenticate and verify a JWT token
export const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token payload to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to authorize specific roles
export const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
  }
  next();
};
