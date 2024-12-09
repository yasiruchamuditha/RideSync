import mongoose from 'mongoose';
const { Schema } = mongoose;

const routeSchema = new Schema({
  routeName: {
    type: String,
    required: true,
    unique: true,
    trim: true, // e.g., 'Galle-Colombo'
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
    enum: ['Normal', 'Expressway'],
    required: true,
  },
  stops: [
    {
      stopName: { type: String, required: true },
      distanceFromStart: { type: Number }, // in km, optional
    },
  ],
  busesAssigned: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Bus',
    },
  ],
}, { timestamps: true });

const Route = mongoose.model('Route', routeSchema);
export default Route;
