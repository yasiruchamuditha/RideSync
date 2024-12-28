// config/swaggerDefinition.js
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'RIDESYNC API',
    version: '1.0.0',
    description: 'Bus management API for RIDESYNC',
  },
  servers: [
    {
      url: 'http://localhost:5000',
    },
  ],
  components: {
    schemas: {
      Bus: {
        type: 'object',
        required: ['ntcRegNumber', 'conductorNtcRegNumber', 'driverNtcRegNumber', 'busNumber', 'capacity', 'busType', 'sector', 'route', 'routeNo'],
        properties: {
          ntcRegNumber: { type: 'string', description: 'NTC Registration Number' },
          conductorNtcRegNumber: { type: 'string', description: 'Conductor\'s NTC Registration Number' },
          driverNtcRegNumber: { type: 'string', description: 'Driver\'s NTC Registration Number' },
          busNumber: { type: 'string', description: 'Bus Number' },
          capacity: { type: 'integer', description: 'Capacity of the bus' },
          busType: { type: 'string', description: 'Type of the bus' },
          sector: { type: 'string', description: 'Sector (Government or Private)' },
          route: { type: 'string', description: 'Route name' },
          routeNo: { type: 'string', description: 'Route number' },
        },
      },
      User: {
        type: 'object',
        required: ['name', 'email', 'password', 'role', 'mobile'],
        properties: {
          name: { type: 'string', description: 'User name' },
          email: { type: 'string', description: 'User email' },
          password: { type: 'string', description: 'User password' },
          role: { type: 'string', description: 'User role', enum: ['admin', 'operator', 'commuter'] },
          mobile: { type: 'string', description: 'User mobile number' },
        },
      },
      Route: {
        type: 'object',
        required: ['name', 'start', 'end', 'distance'],
        properties: {
          name: { type: 'string', description: 'Route name' },
          start: { type: 'string', description: 'Start location' },
          end: { type: 'string', description: 'End location' },
          distance: { type: 'number', description: 'Distance of the route' },
        },
      },
      Schedule: {
        type: 'object',
        required: ['bus', 'route', 'departureTime', 'arrivalTime'],
        properties: {
          bus: { type: 'string', description: 'Bus ID' },
          route: { type: 'string', description: 'Route ID' },
          departureTime: { type: 'string', format: 'date-time', description: 'Departure time' },
          arrivalTime: { type: 'string', format: 'date-time', description: 'Arrival time' },
        },
      },
      Lost: {
        type: 'object',
        required: ['item', 'description', 'dateLost', 'location'],
        properties: {
          item: { type: 'string', description: 'Lost item' },
          description: { type: 'string', description: 'Item description' },
          dateLost: { type: 'string', format: 'date-time', description: 'Date lost' },
          location: { type: 'string', description: 'Location where item was lost' },
        },
      },
      Found: {
        type: 'object',
        required: ['item', 'description', 'dateFound', 'location'],
        properties: {
          item: { type: 'string', description: 'Found item' },
          description: { type: 'string', description: 'Item description' },
          dateFound: { type: 'string', format: 'date-time', description: 'Date found' },
          location: { type: 'string', description: 'Location where item was found' },
        },
      },
    },
  },
};

export { swaggerDefinition };