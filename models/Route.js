//models/Route.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const routeSchema = new Schema({
  routeNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  routeName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  startCity: {
    type: String,
    required: true,
    trim: true,
  },
  endCity: {
    type: String,
    required: true,
    trim: true,
  },
  routeType: {
    type: String,
    enum: ['NormalWay', 'ExpressWay'],
    required: true,
  },
}, { timestamps: true });

const Route = mongoose.model('Route', routeSchema);
export default Route;