# RideSync

A RESTful API for Sri Lanka's **National Transport Commission (NTC)** to manage inter-provincial bus seat reservations, with secure JWT-based authentication, role-based access control, bus schedule management, and a lost-and-found reporting system.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Admin](#admin)
  - [Buses](#buses)
  - [Routes](#routes)
  - [Schedules](#schedules)
  - [Ticket Bookings](#ticket-bookings)
  - [Lost Items](#lost-items)
  - [Found Items](#found-items)
  - [Operator](#operator)
  - [Commuter](#commuter)
- [Data Models](#data-models)
- [User Roles & Permissions](#user-roles--permissions)
- [Author](#author)

---

## Overview

RideSync is a Node.js/Express backend API that enables the NTC to:

- Register and authenticate users (admins, operators, commuters) with JWT tokens
- Manage buses, routes, and trip schedules
- Allow commuters to search for schedules and book seats
- Track seat availability with a visual seat-layout system
- Support lost-and-found item reporting with photo uploads
- Expose interactive API documentation via Swagger UI

**Live API base URL:** `https://bus-ride-sync.vercel.app`

---

## Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js (ES Modules) |
| Framework | Express.js |
| Database | MongoDB (via Mongoose) |
| Authentication | JSON Web Tokens (JWT) + bcryptjs |
| File Uploads | Multer |
| API Docs | Swagger UI (swagger-jsdoc + swagger-ui-express) |
| Validation | validator |
| Dev Tools | Nodemon, ESLint, Prettier, Jest, Supertest |

---

## Project Structure

```
RideSync/
├── app.js                  # Application entry point
├── server.js               # (reserved)
├── package.json
├── config/
│   ├── db.js               # MongoDB connection
│   ├── swaggerConfig.js    # Swagger setup
│   └── swaggerDefinition.js # OpenAPI schemas
├── controllers/
│   ├── authController.js
│   ├── adminController.js
│   ├── busController.js
│   ├── routeController.js
│   ├── scheduleController.js
│   ├── TicketBookingController.js
│   ├── lostController.js
│   └── foundController.js
├── middlewares/
│   └── authMiddleware.js   # JWT auth + role-based access
├── models/
│   ├── User.js
│   ├── Bus.js
│   ├── Route.js
│   ├── Schedule.js
│   ├── TicketBooking.js
│   ├── Lost.js
│   └── Found.js
├── routes/
│   ├── authRoutes.js
│   ├── adminRoutes.js
│   ├── busRoutes.js
│   ├── routeRoutes.js
│   ├── scheduleRoutes.js
│   ├── ticketBookingRoutes.js
│   ├── lostRoutes.js
│   ├── foundRoutes.js
│   ├── operatorRoutes.js
│   └── commuterRoutes.js
├── utils/
│   └── seatLayout.js       # Seat layout generator
└── uploads/                # Uploaded photos (served as static)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

### Installation

```bash
git clone https://github.com/yasiruchamuditha/RideSync.git
cd RideSync
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ridesync
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

| Variable | Description | Required |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for signing JWT tokens | Yes |
| `PORT` | Port for the HTTP server (default: `5000`) | No |

### Running the Application

```bash
# Production
npm start

# Development (with hot-reload via nodemon)
npm run dev
```

The server will start on `http://localhost:5000` (or the port defined in `.env`).

---

## API Documentation

Interactive Swagger UI documentation is available at:

```
http://localhost:5000/api-docs
```

---

## API Endpoints

All protected endpoints require a `Bearer` token in the `Authorization` header:

```
Authorization: Bearer <token>
```

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/signup` | Register a new user | Public |
| POST | `/api/auth/login` | Login and receive a JWT | Public |

### Admin

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/admin/users` | Get all users | Admin |
| GET | `/api/admin/operators` | Get all operators | Admin, Operator |
| GET | `/api/admin/users/:id` | Get user by ID | Admin |
| PUT | `/api/admin/users/:id` | Update user by ID | Admin |
| DELETE | `/api/admin/users/:id` | Delete user by ID | Admin |

### Buses

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/buses` | Create a new bus | Authenticated |
| GET | `/api/buses` | Get all buses | Authenticated |
| GET | `/api/buses/:id` | Get bus by ID | Authenticated |
| PUT | `/api/buses/:id` | Update bus by ID | Authenticated |
| DELETE | `/api/buses/:id` | Delete bus by ID | Admin |
| GET | `/api/buses/ntc/:ntcRegNumber` | Get bus by NTC registration number | Authenticated |
| PUT | `/api/buses/ntc/:ntcRegNumber` | Update bus by NTC registration number | Authenticated |
| DELETE | `/api/buses/ntc/:ntcRegNumber` | Delete bus by NTC registration number | Admin |

### Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/routes/add-predefined` | Add predefined routes | Authenticated |
| POST | `/api/routes/add-manual` | Add a manual route | Authenticated |
| GET | `/api/routes` | Get all routes | Authenticated |
| GET | `/api/routes/:id` | Get route by ID | Authenticated |
| PUT | `/api/routes/update-route` | Update a route | Authenticated |
| DELETE | `/api/routes/:id` | Delete route by ID | Admin |

### Schedules

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/schedules` | Create a new schedule | Admin |
| GET | `/api/schedules` | Get all schedules | Authenticated |
| GET | `/api/schedules/:id` | Get schedule by ID | Authenticated |
| PUT | `/api/schedules/:id` | Update schedule by ID | Admin |
| DELETE | `/api/schedules/:id` | Delete schedule by ID | Admin |
| POST | `/api/schedules/search` | Search schedules by start city, end city, and date | Authenticated |
| GET | `/api/schedules/:id/seats` | Get seat layout for a schedule | Authenticated |
| POST | `/api/schedules/searchbus` | Search schedules by bus ID and departure date | Authenticated |

### Ticket Bookings

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/booking` | Create a new ticket booking | Authenticated |
| GET | `/api/booking` | Get all bookings | Admin, Operator |
| GET | `/api/booking/:id` | Get booking by ID | Admin |
| PUT | `/api/booking/:id` | Update booking by ID | Admin |
| DELETE | `/api/booking/:id` | Delete booking by ID | Admin, Operator |
| GET | `/api/booking/user/:userId` | Get all bookings for a user | Authenticated |

### Lost Items

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/lost` | Create a lost item report (supports photo upload) | Authenticated |
| GET | `/api/lost` | Get all lost item reports | Authenticated |
| GET | `/api/lost/:id` | Get lost item report by ID | Authenticated |
| PUT | `/api/lost/:id` | Update lost item report by ID | Admin |
| DELETE | `/api/lost/:id` | Delete lost item report by ID | Admin |

### Found Items

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/found` | Create a found item report (supports photo upload) | Authenticated |
| GET | `/api/found` | Get all found item reports | Authenticated |
| GET | `/api/found/:id` | Get found item report by ID | Authenticated |
| PUT | `/api/found/:id` | Update found item report by ID | Admin |
| DELETE | `/api/found/:id` | Delete found item report by ID | Admin |

### Operator

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/operator/routes` | Add a new route | Operator |
| POST | `/api/operator/schedules` | Create a new schedule | Operator |
| POST | `/api/operator/searchbus` | Search schedules by bus ID and departure date | Authenticated |
| GET | `/api/operator/ntc/:ntcRegNumber` | Get bus by NTC registration number | Authenticated |

### Commuter

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/commuter/routes` | Get available routes | Authenticated |
| GET | `/api/commuter/booking/:userId` | Get bookings by user ID | Authenticated |

---

## Data Models

### User

| Field | Type | Description |
|---|---|---|
| `name` | String | Full name |
| `email` | String | Unique email address |
| `password` | String | Hashed password |
| `role` | String | `admin` \| `operator` \| `commuter` (default: `commuter`) |
| `mobile` | String | Mobile phone number |
| `nic` | String | National Identity Card number |

### Bus

| Field | Type | Description |
|---|---|---|
| `ntcRegNumber` | String | Unique NTC registration number |
| `conductorNtcRegNumber` | String | Conductor's NTC registration number |
| `driverNtcRegNumber` | String | Driver's NTC registration number |
| `busNumber` | String | Unique vehicle license number |
| `capacity` | Number | Total seat capacity |
| `busType` | String | Bus type (e.g., Normal, Semi Luxury, Luxury) |
| `sector` | String | Sector (Government [CTB] or Private) |
| `route` | String | Route name |
| `routeNo` | String | Route number |
| `operator` | ObjectId | Reference to the operator User |

### Route

| Field | Type | Description |
|---|---|---|
| `routeNumber` | String | Unique route number |
| `routeName` | String | Unique route name |
| `startCity` | String | Starting city |
| `endCity` | String | Ending city |
| `routeType` | String | `NormalWay` \| `ExpressWay` |

### Schedule

| Field | Type | Description |
|---|---|---|
| `busId` | ObjectId | Reference to Bus |
| `route` | ObjectId | Reference to Route |
| `busRouteType` | String | Bus route type |
| `routeWay` | String | Route way (NormalWay / ExpressWay) |
| `startCity` | String | Departure city |
| `departureDate` | Date | Date of departure |
| `departureTime` | String | Time of departure |
| `endCity` | String | Arrival city |
| `arrivalTime` | String | Time of arrival |
| `arrivalDate` | Date | Date of arrival |
| `estimatedTime` | String | Estimated journey duration |
| `estimatedDistance` | String | Estimated journey distance |
| `ticketPrice` | Number | Price per ticket |
| `availableSeats` | Number | Number of currently available seats (default: 50) |
| `seatLayout` | Array | Seat objects with `seatNumber`, `position`, `isBooked`, `bookedBy`, `seatAvailableState` |

### TicketBooking

| Field | Type | Description |
|---|---|---|
| `userId` | ObjectId | Reference to User |
| `scheduleId` | ObjectId | Reference to Schedule |
| `paymentType` | String | `Card Payment` \| `PayPal` \| `Bank Transfer` \| `Bitcoin` |
| `amount` | Number | Amount paid |
| `paymentStatus` | String | `Pending` \| `Completed` \| `Failed` \| `Refunded` |
| `paymentDate` | Date | Date of payment |
| `transactionReference` | String | Unique transaction reference |
| `bookingSeats` | String[] | List of booked seat numbers |
| `cancelSeats` | Array | Cancelled seat details (seatNumber, cancelDate, reason, userId) |

### Lost / Found Item

| Field | Type | Description |
|---|---|---|
| `name` | String | Name of the person reporting |
| `contact` | String | Contact number |
| `email` | String | Email address |
| `busNumber` | String | Bus number where item was lost/found |
| `route` | String | Bus route |
| `lostPlace` / `foundPlace` | String | Location where item was lost/found |
| `size` | String | Size of the item |
| `color` | String | Color of the item |
| `type` | String | Type/category of item |
| `note` | String | Additional notes |
| `status` | String | Report status (default: `pending`) |
| `photos` | String[] | URLs of uploaded photos (up to 4) |

---

## User Roles & Permissions

| Permission | Admin | Operator | Commuter |
|---|:---:|:---:|:---:|
| Manage users | ✅ | ❌ | ❌ |
| Manage buses | ✅ | ✅ | ❌ |
| Manage routes | ✅ | ✅ | ❌ |
| Create/update schedules | ✅ | ✅ | ❌ |
| View schedules | ✅ | ✅ | ✅ |
| Book tickets | ✅ | ✅ | ✅ |
| View all bookings | ✅ | ✅ | ❌ |
| Manage lost/found items | ✅ | ❌ | ❌ |
| Report lost/found items | ✅ | ✅ | ✅ |

---

## Author

- **Name:** Y.C.Wijesinghe
- **NIBM Index:** COBSCCOMP232P-018
- **CU Index:** 14946394
