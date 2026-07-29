// controllers/driver.controller.js
const driverService = require('../services/driver.service');

// Create a new driver profile
exports.createDriver = async (req, res) => {
  try {
    const driver = await driverService.createDriver(req.body);
    res.status(201).json(driver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all drivers
exports.getDrivers = async (req, res) => {
  try {
    const drivers = await driverService.getDrivers();
    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single driver by ID
exports.getDriverById = async (req, res) => {
  try {
    const driver = await driverService.getDriverById(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.status(200).json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify a driver
exports.verifyDriver = async (req, res) => {
  try {
    const driver = await driverService.verifyDriver(req.params.id);
    res.status(200).json({ message: 'Driver verified', driver });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
