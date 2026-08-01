const mongoose = require('mongoose');

const driverProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }
}, { timestamps: true });

module.exports = mongoose.model('DriverProfile', driverProfileSchema);
