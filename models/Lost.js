//Lost.js
import mongoose from 'mongoose';

const lostSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    busNumber: { type: String, required: true },
    route: { type: String, required: true },
    lostPlace: { type: String, required: true },
    size: { type: String },
    color: { type: String, required: true },
    type: { type: String, required: true },
    note: { type: String },
    photos: [{ type: String }], // Assuming photos are stored as URLs
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model('Lost', lostSchema);