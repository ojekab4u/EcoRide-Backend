const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');

// Create a new vehicle
router.post('/', vehicleController.createVehicle);

// Get all vehicles
router.get('/', vehicleController.getVehicles);

// Get a single vehicle by ID
router.get('/:id', vehicleController.getVehicleById);

module.exports = router;

const { createVehicleSchema, updateVehicleSchema } = require('../validators/vehicle.validator');

router.post('/vehicles', validator.body(createVehicleSchema), vehicleController.createVehicle);
router.patch('/vehicles/:id', validator.body(updateVehicleSchema), vehicleController.updateVehicle);

const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const { createVehicleSchema, updateVehicleSchema } = require('../validators/vehicle.validator');
const validator = require('express-joi-validation').createValidator({});

// POST /vehicles → create vehicle
router.post('/vehicles', validator.body(createVehicleSchema), vehicleController.createVehicle);

// GET /vehicles → list all vehicles
router.get('/vehicles', vehicleController.getVehicles);

// PATCH /vehicles/:id → update vehicle
router.patch('/vehicles/:id', validator.body(updateVehicleSchema), vehicleController.updateVehicle);

// DELETE /vehicles/:id → delete vehicle
router.delete('/vehicles/:id', vehicleController.deleteVehicle);

module.exports = router;
