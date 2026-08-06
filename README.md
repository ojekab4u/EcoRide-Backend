# EcoRide Backend API

## Group 6 Capstone Project

## Project Overview

EcoRide Backend API is a RESTful ride-sharing and carpooling platform designed to connect passengers with drivers travelling along similar routes. The platform provides secure authentication, ride management, ride booking, wallet services, notifications, ratings, corporate transportation management, and an administrative dashboard for monitoring platform activities.

The system implements Role-Based Access Control (RBAC) to provide dedicated functionalities for Passengers, Drivers, Corporate Administrators, and Platform Administrators.

---

## Features

- User Registration & Authentication
- JWT Authentication
- Role-Based Access Control (RBAC)
- Passenger Profile Management
- Driver Profile Verification
- Corporate Profile Management
- Vehicle Registration
- Vehicle Inspection Management
- Ride Publishing & Management
- Ride Search & Matching
- Ride Booking
- Recurring Ride Booking
- Driver Live Location Updates
- Ride History
- Wallet Management
- Mock Payment Processing
- Transaction History
- Notifications
- Driver & Passenger Ratings
- Corporate Employee Management
- Driver Dashboard
- Passenger Dashboard
- Corporate Dashboard
- Platform Administration Dashboard

---

## Technology Stack

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL
- Sequelize ORM

### Authentication & Security

- JSON Web Token (JWT)
- bcryptjs
- Helmet
- CORS

### File Upload

- Multer
- Cloudinary

### Validation & Utilities

- Express Validator
- Morgan
- dotenv

---

## Project Structure

```text
EcoRide_Backend
│
├── src
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── helpers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── validators
│
├── app.js
├── package.json
├── .env.example
└── README.md
```

## Installation

Clone the repository

```bash
git clone https://github.com/<your-username>/EcoRide_Backend.git
```

Navigate into the project directory

```bash
cd EcoRide_Backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecoride
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_USER=
EMAIL_PASSWORD=
```

Run the development server

```bash
npm run dev
```

---

## API Base URL

```
http://localhost:3000/api/v1
```

---

## User Roles

The system supports four user roles:

- Passenger
- Driver
- Corporate Administrator
- Platform Administrator

Access to resources is controlled through Role-Based Access Control (RBAC).

---

## API Modules

### Authentication

```http
POST   /auth/register
POST   /auth/login
POST   /auth/forgot-password
POST   /auth/reset-password
PATCH  /auth/change-password
GET    /auth/me
```

### Passenger

```http
GET    /passengers/profile
PATCH  /passengers/profile
GET    /dashboard/passenger
```

### Driver

```http
GET    /drivers/profile
PATCH  /drivers/profile
GET    /dashboard/driver
```

### Ride Management

```http
POST   /rides
GET    /rides
GET    /rides/search
GET    /rides/history
GET    /rides/history/me
GET    /rides/:id

PATCH  /rides/:id
PATCH  /rides/:id/start
PATCH  /rides/:id/arrive
PATCH  /rides/:id/complete
PATCH  /rides/:id/cancel

PATCH  /rides/:id/location
GET    /rides/:id/location

DELETE /rides/:id
```

### Booking

```http
POST   /bookings
GET    /bookings
GET    /bookings/:id
PATCH  /bookings/:id/accept
PATCH  /bookings/:id/reject
PATCH  /bookings/:id/cancel
PATCH  /bookings/:id/acknowledge
```

### Wallet & Payments

```http
GET    /wallet
GET    /payments
POST   /payments/mock
```

### Notifications

```http
GET    /notifications
PATCH  /notifications/read-all
PATCH  /notifications/:id/read
DELETE /notifications/:id
```

### Ratings

```http
POST   /ratings
GET    /ratings/me
GET    /ratings/user/:userId
```

### Corporate

```http
POST   /corporate/profile
GET    /corporate/profile
PATCH  /corporate/profile

POST   /corporate/documents
GET    /corporate/documents
PATCH  /corporate/documents

GET    /corporate/dashboard

POST   /corporate/employees
GET    /corporate/employees
GET    /corporate/employees/:id
PATCH  /corporate/employees/:id
DELETE /corporate/employees/:id
```

### Platform Administration

```http
GET    /admin/dashboard

GET    /admin/users
PATCH  /admin/users/:id/role

GET    /admin/drivers
PATCH  /admin/drivers/:driverId

GET    /admin/passengers
PATCH  /admin/passengers/:passengerId

GET    /admin/vehicles
PATCH  /admin/vehicles/:id

GET    /admin/inspections
PATCH  /admin/inspections/:id

GET    /admin/corporates
PATCH  /admin/corporates/:corporateId
```

---

## Testing

The API was tested using Postman. All endpoints were validated for authentication, authorization, request validation, and expected success and error responses.

---

## Future Improvements

- Real-time ride tracking using WebSockets
- Live ETA calculation
- Push notifications
- Paystack/Flutterwave integration
- Route recommendation engine
- Carbon emission analytics
- Advanced reporting dashboard

---

## Contributors

Group 6 Capstone Team

---

## License

This project was developed as an academic capstone project for educational purposes.