import Route from '../models/Routes.js';

// Add predefined routes
export const addRoutes = async (req, res) => {
  const predefinedRoutes = [
    { routeName: 'Galle-Colombo', startCity: 'Galle', endCity: 'Colombo', routeType: 'Normal' },
    { routeName: 'Galle-Colombo (Expressway)', startCity: 'Galle', endCity: 'Colombo', routeType: 'Expressway' },
    { routeName: 'Colombo-Kandy', startCity: 'Colombo', endCity: 'Kandy', routeType: 'Normal' },
    { routeName: 'Colombo-Kandy (Expressway)', startCity: 'Colombo', endCity: 'Kandy', routeType: 'Expressway' },
    { routeName: 'Kandy-Jaffna', startCity: 'Kandy', endCity: 'Jaffna', routeType: 'Normal' },
    { routeName: 'Matara-Colombo', startCity: 'Matara', endCity: 'Colombo', routeType: 'Normal' },
    { routeName: 'Matara-Colombo (Expressway)', startCity: 'Matara', endCity: 'Colombo', routeType: 'Expressway' },
    { routeName: 'Kandy-Nuwara Eliya', startCity: 'Kandy', endCity: 'Nuwara Eliya', routeType: 'Normal' },
    { routeName: 'Jaffna-Trincomalee', startCity: 'Jaffna', endCity: 'Trincomalee', routeType: 'Normal' },
    { routeName: 'Hambantota-Galle', startCity: 'Hambantota', endCity: 'Galle', routeType: 'Normal' },
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
    const routes = await Route.find().populate('busesAssigned');
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign a bus to a route
export const assignBusToRoute = async (req, res) => {
  const { routeId, busId } = req.body;

  try {
    const route = await Route.findById(routeId);
    if (!route) return res.status(404).json({ message: 'Route not found' });

    route.busesAssigned.push(busId);
    await route.save();

    res.status(200).json({ message: 'Bus assigned to route', route });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Add stops to an existing route
export const addStops = async (req, res) => {
    const { routeId, stops } = req.body;
  
    try {
      // Find the route by ID
      const route = await Route.findById(routeId);
      if (!route) return res.status(404).json({ message: 'Route not found' });
  
      // Add new stops to the route
      route.stops.push(...stops);
      await route.save();
  
      res.status(200).json({ message: 'Stops added successfully', route });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Add a manual route based on user input
export const addManualRoute = async (req, res) => {
    const { routeName, startCity, endCity, routeType, stops } = req.body;
  
    try {
      // Validate input
      if (!routeName || !startCity || !endCity || !routeType) {
        return res.status(400).json({ message: 'All required fields must be provided' });
      }
  
      // Check for duplicate route name
      const existingRoute = await Route.findOne({ routeName });
      if (existingRoute) {
        return res.status(400).json({ message: 'Route name already exists' });
      }
  
      // Create new route
      const newRoute = new Route({
        routeName,
        startCity,
        endCity,
        routeType,
        stops: stops || [], // Use empty array if stops are not provided
      });
  
      await newRoute.save();
      res.status(201).json({ message: 'Route added successfully', route: newRoute });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  