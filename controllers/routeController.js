import Route from '../models/Routes.js';

// Add predefined routes
export const addRoutes = async (req, res) => {
  const predefinedRoutes = [
    { routeNumber: '001', routeName: 'Kandy-Colombo', startCity: 'Kandy', endCity: 'Colombo', routeType: 'Normal' },
    { routeNumber: '001-1', routeName: 'Kegalle-Colombo', startCity: 'kegalle', endCity: 'Colombo', routeType: 'Normal' },
    { routeNumber: '002', routeName: 'Matara-Colombo', startCity: 'Matara', endCity: 'Colombo', routeType: 'Normal' },
    { routeNumber: '002-1', routeName: 'Galle-Colombo', startCity: 'Galle', endCity: 'Colombo', routeType: 'Normal' },
    { routeNumber: '003', routeName: 'Avissawella-Colombo', startCity: 'Avissawella', endCity: 'Colombo', routeType: 'Normal' },
    { routeNumber: '003-1', routeName: 'Embilipitiya-Colombo', startCity: 'Embilipitiya', endCity: 'Colombo', routeType: 'Normal' },
    { routeNumber: '004', routeName: 'Anuradapura -Colombo', startCity: 'Anuradapura ', endCity: 'Colombo', routeType: 'Normal' },
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

// Get route by ID
export const getRouteById = async (req, res) => {
  const { routeId } = req.params;

  try {
    const route = await Route.findById(routeId);
    if (!route) return res.status(404).json({ message: "Route not found" });

    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};