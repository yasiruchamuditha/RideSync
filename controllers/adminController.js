//adminController.js
import User from '../models/User.js';

// Get all users (Admin-only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Get a user by ID (Admin-only)
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

// Update a user (Admin-only)
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role, mobile } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update user details
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.mobile = mobile || user.mobile;

        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete a user (Admin-only)
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: `User with ID ${id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};


// // // Get all bookings
// // export const getAllBookings = async (req, res) => {
// //     try {
// //         const bookings = await Booking.find().populate('routeId userId');
// //         res.status(200).json(bookings);
// //     } catch (error) {
// //         res.status(500).json({ message: 'Error fetching bookings', error: error.message });
// //     }
// // };
