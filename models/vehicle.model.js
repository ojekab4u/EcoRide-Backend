const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  plateNumber: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  manufacturer: { type: String, required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverProfile' }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
