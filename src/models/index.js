import User from "./user.model.js";
import DriverProfile from "./driver.model.js";
import DriverDocument from "./driverDocument.model.js";
import Vehicle from "./vehicle.model.js";
import VehicleInspection from "./vehicleInspection.model.js";
import Ride from "./ride.model.js";
import Booking from "./booking.model.js";
import Payment from "./payment.model.js";
import Wallet from "./wallet.model.js";
import Rating from "./rating.model.js";
import Notification from "./notification.model.js";
import BankAccount from "./bankAccount.model.js";



// USER RELATIONSHIPS
User.hasOne(DriverProfile, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

DriverProfile.belongsTo(User, {
    foreignKey: "userId",
});


User.hasMany(BankAccount, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

BankAccount.belongsTo(User, {
    foreignKey: "userId",
});


User.hasOne(Wallet, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Wallet.belongsTo(User, {
    foreignKey: "userId",
});


User.hasMany(Notification, {
    foreignKey: "userId",
});

Notification.belongsTo(User, {
    foreignKey: "userId",
});


User.hasMany(Booking, {
    foreignKey: "passengerId",
});

Booking.belongsTo(User, {
    foreignKey: "passengerId",
});

// DRIVER PROFILE
DriverProfile.hasOne(DriverDocument, {
    foreignKey: "driverId",
    onDelete: "CASCADE",
});

DriverDocument.belongsTo(DriverProfile, {
    foreignKey: "driverId",
});


DriverProfile.hasMany(Vehicle, {
    foreignKey: "driverId",
    onDelete: "CASCADE",
});

Vehicle.belongsTo(DriverProfile, {
    foreignKey: "driverId",
});


// VEHICLE
Vehicle.hasOne(VehicleInspection, {
    foreignKey: "vehicleId",
    onDelete: "CASCADE",
});

VehicleInspection.belongsTo(Vehicle, {
    foreignKey: "vehicleId",
});


Vehicle.hasMany(Ride, {
    foreignKey: "vehicleId",
});

Ride.belongsTo(Vehicle, {
    foreignKey: "vehicleId",
});


// RIDE
Ride.hasMany(Booking, {
    foreignKey: "rideId",
});

Booking.belongsTo(Ride, {
    foreignKey: "rideId",
});



// BOOKING
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
    DriverDocument,
    Vehicle,
    VehicleInspection,
    Ride,
    Booking,
    Payment,
    Wallet,
    Rating,
    Notification,
    BankAccount,
};