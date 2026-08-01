// services/vehicle.service.js
const Vehicle = require('../models/vehicle.model');

// Create a new vehicle
exports.createVehicle = async (data) => {
  const vehicle = new Vehicle(data);
  return await vehicle.save();
};

// Get all vehicles
exports.getVehicles = async () => {
  return await Vehicle.find().populate('driverId'); // populate driver info
};

// Get vehicle by ID
exports.getVehicleById = async (id) => {
  return await Vehicle.findById(id).populate('driverId');
};

// Update vehicle
exports.updateVehicle = async (id, data) => {
  return await Vehicle.findByIdAndUpdate(id, data, { new: true });
};

// Delete vehicle
exports.deleteVehicle = async (id) => {
  return await Vehicle.findByIdAndDelete(id);
};

const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driver.controller');
const { createDriverSchema } = require('../validators/driver.validator');
const validator = require('express-joi-validation').createValidator({});

// POST /drivers → create driver
router.post('/drivers', validator.body(createDriverSchema), driverController.createDriver);

// GET /drivers → list all drivers
router.get('/drivers', driverController.getDrivers);

module.exports = router;
