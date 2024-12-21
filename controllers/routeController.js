import Route from '../models/Routes.js';

// Add predefined routes
export const addRoutes = async (req, res) => {
  const predefinedRoutes = [
    { routeNumber: 'R001', routeName: 'Galle-Colombo', startCity: 'Galle', endCity: 'Colombo', routeType: 'Normal' },
    { routeNumber: 'R002', routeName: 'Galle-Colombo (Expressway)', startCity: 'Galle', endCity: 'Colombo', routeType: 'Expressway' },
    { routeNumber: 'R003', routeName: 'Colombo-Kandy', startCity: 'Colombo', endCity: 'Kandy', routeType: 'Normal' },
    { routeNumber: 'R004', routeName: 'Colombo-Kandy (Expressway)', startCity: 'Colombo', endCity: 'Kandy', routeType: 'Expressway' },
    { routeNumber: 'R005', routeName: 'Kandy-Jaffna', startCity: 'Kandy', endCity: 'Jaffna', routeType: 'Normal' },
    { routeNumber: 'R006', routeName: 'Matara-Colombo', startCity: 'Matara', endCity: 'Colombo', routeType: 'Normal' },
    { routeNumber: 'R007', routeName: 'Matara-Colombo (Expressway)', startCity: 'Matara', endCity: 'Colombo', routeType: 'Expressway' },
    { routeNumber: 'R008', routeName: 'Kandy-Nuwara Eliya', startCity: 'Kandy', endCity: 'Nuwara Eliya', routeType: 'Normal' },
    { routeNumber: 'R009', routeName: 'Jaffna-Trincomalee', startCity: 'Jaffna', endCity: 'Trincomalee', routeType: 'Normal' },
    { routeNumber: 'R010', routeName: 'Hambantota-Galle', startCity: 'Hambantota', endCity: 'Galle', routeType: 'Normal' },
  ];

  try {
    await Route.insertMany(predefinedRoutes);
    res.status(201).json({ message: 'Routes added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all routes
export const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a manual route based on user input
export const addManualRoute = async (req, res) => {
  const { routeNumber, routeName, startCity, endCity, routeType } = req.body;

  try {
    if (!routeNumber || !routeName || !startCity || !endCity || !routeType) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const existingRoute = await Route.findOne({ routeNumber });
    if (existingRoute) {
      return res.status(400).json({ message: 'Route number already exists' });
    }

    const newRoute = new Route({
      routeNumber,
      routeName,
      startCity,
      endCity,
      routeType,
    });

    await newRoute.save();
    res.status(201).json({ message: 'Route added successfully', route: newRoute });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a route
export const updateRoute = async (req, res) => {
  const { routeId, updates } = req.body;

  try {
    const route = await Route.findByIdAndUpdate(routeId, updates, { new: true });
    if (!route) return res.status(404).json({ message: "Route not found" });

    res.status(200).json({
      message: "Route updated successfully",
      route,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a route
export const deleteRoute = async (req, res) => {
  const { routeId } = req.body;

  try {
    const route = await Route.findByIdAndDelete(routeId);
    if (!route) return res.status(404).json({ message: "Route not found" });

    res.status(200).json({
      message: "Route deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};