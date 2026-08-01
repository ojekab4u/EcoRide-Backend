// validators/driver.validator.js
const Joi = require('joi');

const createDriverSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  licenseNumber: Joi.string().alphanum().min(5).required(),
});

module.exports = {
  createDriverSchema,
};
