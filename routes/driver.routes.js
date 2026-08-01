const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driver.controller');

// Create a new driver
router.post('/', driverController.createDriver);

// Get all drivers
router.get('/', driverController.getDrivers);

// Get a single driver by ID
router.get('/:id', driverController.getDriverById);

// Verify a driver
router.patch('/:id/verify', driverController.verifyDriver);

module.exports = router;

const { createDriverSchema } = require('../validators/driver.validator');
const validator = require('express-joi-validation').createValidator({});

router.post('/drivers', validator.body(createDriverSchema), driverController.createDriver);
