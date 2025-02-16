//controller/foundController.js
import Found from '../models/Found.js';
import multer from 'multer';

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/found_report'); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Create a new found item report
export const createFound = async (req, res) => {
  try {
    const photos = req.files ? req.files.map(file => `/uploads/found_report${file.filename}`) : [];

    const foundItem = new Found({
      ...req.body,
      photos,
    });

    await foundItem.save();
    res.status(201).json({ message: 'Found item report created successfully', foundItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export { upload };


// Get all found item reports
export const getAllFound = async (req, res) => {
  try {
    const foundItems = await Found.find();
    res.status(200).json(foundItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get found item report by ID
export const getFoundById = async (req, res) => {
  try {
    const foundItem = await Found.findById(req.params.id);
    if (!foundItem) {
      return res.status(404).json({ message: 'Found item not found' });
    }
    res.status(200).json(foundItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update found item report by ID
export const updateFoundById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundItem = await Found.findById(id);

    if (!foundItem) {
      return res.status(404).json({ message: 'Found item not found' });
    }

    // Check if the user is the one who created the report or an admin
    if (req.user.role !== 'admin' && foundItem.email !== req.user.email) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    Object.assign(foundItem, req.body);
    await foundItem.save();
    res.status(200).json({ message: 'Found item report updated successfully', foundItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete found item report by ID
export const deleteFoundById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundItem = await Found.findById(id);

    if (!foundItem) {
      return res.status(404).json({ message: 'Found item not found' });
    }

    // Only admin can delete found item reports
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    await Found.deleteOne({ _id: id });
    res.status(200).json({ message: 'Found item report deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
