// controllers/vehicle.controller.js
const vehicleService = require('../services/vehicle.service');

// Create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all vehicles
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getVehicles();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const updatedVehicle = await vehicleService.updateVehicle(req.params.id, req.body);
    if (!updatedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const deletedVehicle = await vehicleService.deleteVehicle(req.params.id);
    if (!deletedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
