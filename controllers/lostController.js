//lostController.js
import Lost from '../models/Lost.js';
import multer from 'multer';

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/lost_report'); // Save files to the 'uploads/lost_report' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

export const createLost = async (req, res) => {
  try {
    const photos = req.files ? req.files.map(file => `/uploads/lost_report/${file.filename}`) : [];

    const lostItem = new Lost({
      ...req.body,
      photos,
    });

    await lostItem.save();
    res.status(201).json({ message: 'Lost item report created successfully', lostItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { upload };

export const getAllLost = async (req, res) => {
  try {
    const lostItems = await Lost.find();
    res.status(200).json(lostItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLostById = async (req, res) => {
  try {
    const lostItem = await Lost.findById(req.params.id);
    if (!lostItem) {
      return res.status(404).json({ message: 'Lost item not found' });
    }
    res.status(200).json(lostItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLostById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateLostItem = await Lost.findById(id);

    if (!updateLostItem) {
      return res.status(404).json({ message: 'Lost item not found' });
    }

     // Check if the user is the one who created the report or an admin
     if (req.user.role !== 'admin' && updateLostItem.email !== req.user.email) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }


    Object.assign(updateLostItem, req.body);
    await updateLostItem.save();
    res.status(200).json({ message: 'Lost item report updated successfully', updateLostItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLostById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteLostItem = await Lost.findById(id);

    if (!deleteLostItem) {
      return res.status(404).json({ message: 'Lost item not found' });
    }

    // Only admin can delete found item reports
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    await Lost.deleteOne({ _id: id });
    res.status(200).json({ message: 'Lost item report deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};