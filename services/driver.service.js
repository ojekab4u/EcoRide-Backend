// services/driver.service.js
const Driver = require('../models/driverProfile.model');

// Create a new driver
exports.createDriver = async (data) => {
  const driver = new Driver(data);
  return await driver.save();
};

// Get all drivers
exports.getDrivers = async () => {
  return await Driver.find();
};

// Get driver by ID
exports.getDriverById = async (id) => {
  return await Driver.findById(id);
};

// Verify driver
exports.verifyDriver = async (id) => {
  const driver = await Driver.findByIdAndUpdate(
    id,
    { verified: true },
    { new: true }
  );
  return driver;
};
