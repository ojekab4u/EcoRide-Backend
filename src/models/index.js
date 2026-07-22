import User from "./user.model.js";
import DriverProfile from "./driver.model.js";
import Vehicle from "./vehicle.model.js";
import Ride from "./ride.model.js";
import Booking from "./booking.model.js";
import Payment from "./payment.model.js";
import Wallet from "./wallet.model.js";
import Rating from "./rating.model.js";
import Notification from "./notification.model.js";


// User <-> DriverProfile
User.hasOne(DriverProfile, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

DriverProfile.belongsTo(User, {
  foreignKey: "userId",
});

// User <-> Wallet
User.hasOne(Wallet, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Wallet.belongsTo(User, {
  foreignKey: "userId",
});

// User <-> Ride (Driver)
User.hasMany(Ride, {
  foreignKey: "driverId",
});

Ride.belongsTo(User, {
  foreignKey: "driverId",
});

// User <-> Booking (Passenger)
User.hasMany(Booking, {
  foreignKey: "passengerId",
});

Booking.belongsTo(User, {
  foreignKey: "passengerId",
});

// User <-> Vehicle
User.hasMany(Vehicle, {
  foreignKey: "driverId",
});

Vehicle.belongsTo(User, {
  foreignKey: "driverId",
});

// User <-> Notification
User.hasMany(Notification, {
  foreignKey: "userId",
});

Notification.belongsTo(User, {
  foreignKey: "userId",
});

// RIDE RELATIONSHIPS
Ride.hasMany(Booking, {
  foreignKey: "rideId",
});

Booking.belongsTo(Ride, {
  foreignKey: "rideId",
});

//BOOKING RELATIONSHIPS
Booking.hasOne(Payment, {
  foreignKey: "bookingId",
});

Payment.belongsTo(Booking, {
  foreignKey: "bookingId",
});

Booking.hasOne(Rating, {
  foreignKey: "bookingId",
});

Rating.belongsTo(Booking, {
  foreignKey: "bookingId",
});

export {
  User,
  DriverProfile,
  Vehicle,
  Ride,
  Booking,
  Payment,
  Wallet,
  Rating,
  Notification,
};