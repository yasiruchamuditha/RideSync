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
    {
      url: 'https://bus-ride-sync.vercel.app',
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
          operator: { type: 'string', description: 'Operator reference' },
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
          nic: { type: 'string', description: 'User NIC number' },
        },
      },
      Route: {
        type: 'object',
        required: ['routeNumber', 'routeName', 'startCity', 'endCity', 'routeType'],
        properties: {
          routeNumber: { type: 'string', description: 'Route number' },
          routeName: { type: 'string', description: 'Route name' },
          startCity: { type: 'string', description: 'Start city' },
          endCity: { type: 'string', description: 'End city' },
          routeType: { type: 'string', description: 'Type of the route', enum: ['Normalway', 'Expressway'] },
        },
      },
      Schedule: {
        type: 'object',
        required: ['busId', 'route', 'busRouteType', 'routeWay', 'startCity', 'departureDate', 'departureTime', 'endCity', 'arrivalTime', 'arrivalDate', 'estimatedTime', 'estimatedDistance', 'ticketPrice', 'availableSeats'],
        properties: {
          busId: { type: 'string', description: 'Bus ID' },
          route: { type: 'string', description: 'Route ID' },
          busRouteType: { type: 'string', description: 'Type of the bus route' },
          routeWay: { type: 'string', description: 'Type of the bus route way' },
          startCity: { type: 'string', description: 'City where the bus starts its journey' },
          departureDate: { type: 'string', format: 'date', description: 'Date of the schedule' },
          departureTime: { type: 'string', description: 'Time of the bus departure' },
          endCity: { type: 'string', description: 'City where the bus ends its journey' },
          arrivalTime: { type: 'string', description: 'Time of the bus arrival at the destination' },
          arrivalDate: { type: 'string', format: 'date', description: 'Date of the schedule' },
          estimatedTime: { type: 'string', description: 'Estimated time of the journey' },
          estimatedDistance: { type: 'string', description: 'Estimated distance of the journey' },
          ticketPrice: { type: 'number', description: 'Price of the ticket' },
          availableSeats: { type: 'number', description: 'Number of available seats', default: 50 },
          seatLayout: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                seatNumber: { type: 'string', description: 'Seat number' },
                bookedBy: { type: 'string', description: 'User ID who booked the seat' },
                position: { type: 'string', description: 'Position of the seat' },
                isBooked: { type: 'boolean', description: 'Booking status of the seat', default: false },
                seatAvailableState: { type: 'string', description: 'Availability state of the seat', default: 'available' },
              },
            },
          },
        },
      },
      Lost: {
        type: 'object',
        required: ['name', 'contact', 'email', 'busNumber', 'route', 'lostPlace', 'color', 'type'],
        properties: {
          name: { type: 'string', description: 'Name of the person who lost the item' },
          contact: { type: 'string', description: 'Contact number of the person who lost the item' },
          email: { type: 'string', description: 'Email of the person who lost the item' },
          busNumber: { type: 'string', description: 'Bus number where the item was lost' },
          route: { type: 'string', description: 'Route of the bus' },
          lostPlace: { type: 'string', description: 'Place where the item was lost' },
          size: { type: 'string', description: 'Size of the lost item' },
          color: { type: 'string', description: 'Color of the lost item' },
          type: { type: 'string', description: 'Type of the lost item' },
          note: { type: 'string', description: 'Additional notes about the lost item' },
          status: { type: 'string', description: 'Status of the lost item report', default: 'pending' },
          photos: {
            type: 'array',
            items: { type: 'string', description: 'URLs of photos of the lost item' },
          },
        },
      },
      Found: {
        type: 'object',
        required: ['name', 'contact', 'email', 'busNumber', 'route', 'foundPlace', 'size', 'color', 'type'],
        properties: {
          name: { type: 'string', description: 'Name of the person who found the item' },
          contact: { type: 'string', description: 'Contact number of the person who found the item' },
          email: { type: 'string', description: 'Email of the person who found the item' },
          busNumber: { type: 'string', description: 'Bus number where the item was found' },
          route: { type: 'string', description: 'Route of the bus' },
          foundPlace: { type: 'string', description: 'Place where the item was found' },
          size: { type: 'string', description: 'Size of the found item' },
          color: { type: 'string', description: 'Color of the found item' },
          type: { type: 'string', description: 'Type of the found item' },
          note: { type: 'string', description: 'Additional notes about the found item' },
          status: { type: 'string', description: 'Status of the found item report', default: 'pending' },
          photos: {
            type: 'array',
            items: { type: 'string', description: 'URLs of photos of the found item' },
          },
        },
      },
      TicketBooking: {
        type: 'object',
        required: ['userId', 'scheduleId', 'paymentType', 'amount', 'paymentStatus', 'bookingSeats'],
        properties: {
          userId: { type: 'string', description: 'ID of the user who booked the ticket' },
          scheduleId: { type: 'string', description: 'ID of the schedule' },
          paymentType: { type: 'string', description: 'Type of payment', enum: ['Card Payment', 'PayPal', 'Bank Transfer', 'Bitcoin'] },
          amount: { type: 'number', description: 'Amount paid for the ticket' },
          paymentStatus: { type: 'string', description: 'Status of the payment', enum: ['Pending', 'Completed', 'Failed', 'Refunded'] },
          paymentDate: { type: 'string', format: 'date-time', description: 'Date of the payment' },
          transactionReference: { type: 'string', description: 'Unique reference for the transaction' },
          bookingSeats: {
            type: 'array',
            items: { type: 'string', description: 'List of seat numbers booked' },
          },
          cancelSeats: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                seatNumber: { type: 'string', description: 'Seat number that was cancelled' },
                cancelDate: { type: 'string', format: 'date-time', description: 'Date of cancellation' },
                reason: { type: 'string', description: 'Reason for cancellation' },
                userId: { type: 'string', description: 'ID of the user who cancelled the seat' },
              },
            },
          },
        },
      },
    },
  },
};

export { swaggerDefinition };