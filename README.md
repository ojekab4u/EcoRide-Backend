# EcoRide-Backend API

# Team
Group 6 Capstone Project

## Project Status
Currently under active development.

## Table of Contents
- Introduction
- Features 
- Tech Stack 
- Project structure
- Installation
- Environment variables
- Running the project 
- API endpoints 
- Example request and response
- Testing
- Contributors
- Licence

## Introduction
Ecoride is a  RESTful backend API, a ride-sharing and carpooling platform that connects passengers with drivers travelling along similar routes....

## Features
- User Authentication
- Role Based Access Control (RBAC)
- Driver Verification
- Vehicle Registration
- Ride Publishing
- Ride Search & Matching
- Ride Booking
- Wallet Management
- Payment Integration
- Notifications
- Ratings & Reviews

## Tech Stack
- **Runtime Environment:** Node.js

- **Framework:** Express.js

- **Development Tool:** Nodemon

- **Database:** PostgreSQL

- **Schema:** Sequelize ORM

- **

- 
- 
- JWT Authentication
- bcryptjs
- Multer
- Cloudinary
- Express Validator
- Helmet
- Morgan
- CORS

---

# Project Structure

```
EcoRide_Backend
│
├── src
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── helpers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── uploads
│   ├── utils
│   └── validators
│
├── app.js
├── package.json
├── .env
└── README.md
```

# Installation

Clone the repository

```bash
git clone https://github.com/ojekab4u/EcoRide-Backend.git
```

Enter the project

```bash
cd EcoRide_Backend
```

Install dependencies

```bash
npm install
```
Create an `.env` file

# Environment Variables
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecoride
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
```

Run the server

```bash
npm run dev
```

---

# API Base URL

```
http://localhost:3000/api/v1
```

---

# API Modules

## Authentication

```
POST   /auth/register
POST   /auth/login
GET    /auth/profile
PATCH  /auth/profile
PATCH  /auth/change-password
```

---

## Users

```
GET    /users
GET    /users/:id
PATCH  /users/:id
DELETE /users/:id
```

---

## Drivers

```
POST   /drivers
GET    /drivers/profile
PATCH  /drivers/:id/verify
```

---

## Vehicles

```
POST   /vehicles
GET    /vehicles
GET    /vehicles/:id
PATCH  /vehicles/:id
DELETE /vehicles/:id
```

---

## Rides

```
POST   /rides
GET    /rides
GET    /rides/:id
PATCH  /rides/:id
DELETE /rides/:id
GET    /rides/search
```

---

## Bookings

```
POST   /bookings
GET    /bookings
GET    /bookings/:id
PATCH  /bookings/:id/confirm
PATCH  /bookings/:id/reject
PATCH  /bookings/:id/cancel
```

---

## Wallet

```
GET    /wallet
POST   /wallet/fund
POST   /wallet/withdraw
GET    /wallet/history
```

---

## Payments

```
POST   /payments/initialize
GET    /payments/verify/:reference
POST   /payments/webhook
```

---

## Ratings

```
POST   /ratings
GET    /ratings/:rideId
```

---

## Notifications

```
GET    /notifications
PATCH  /notifications/:id/read
```

---

# Development Workflow

1. Pull the latest changes from `main`.
2. Create a feature branch.
3. Implement your assigned task.
4. Test your code.
5. Commit your changes.
6. Push your branch.
7. Create a Pull Request.
8. Wait for review before merging.

---

# Git Branch Naming

```
feature/authentication

feature/rides

feature/bookings

feature/payment

bugfix/login

hotfix/payment
```

---

# Coding Standards

- Use ES Modules.
- Follow REST API conventions.
- Use async/await.
- Keep controllers thin.
- Put business logic inside services.
- Validate every request.
- Handle errors consistently.
- Never commit `.env`.
- Write descriptive commit messages.

---


---

# License

Academic Capstone Project