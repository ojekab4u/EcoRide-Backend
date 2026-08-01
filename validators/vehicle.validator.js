// validators/vehicle.validator.js
const Joi = require('joi');

const createVehicleSchema = Joi.object({
  plateNumber: Joi.string().alphanum().min(5).required(),
  type: Joi.string().valid('car', 'bike', 'bus').required(),
  driverId: Joi.string().required(), // must be a valid driver reference
  imageUrl: Joi.string().uri().optional(),
});

const updateVehicleSchema = Joi.object({
  plateNumber: Joi.string().alphanum().min(5).optional(),
  type: Joi.string().valid('car', 'bike', 'bus').optional(),
  imageUrl: Joi.string().uri().optional(),
});

module.exports = {
  createVehicleSchema,
  updateVehicleSchema,
};
