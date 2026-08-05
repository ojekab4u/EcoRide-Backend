import User from "./user.model.js";
import DriverProfile from "./driver.model.js";
import DriverDocument from "./driverDocument.model.js";
import Vehicle from "./vehicle.model.js";
import VehicleInspection from "./vehicleInspection.model.js";
import Ride from "./ride.model.js";
import Booking from "./booking.model.js";
import Payment from "./payment.model.js";
import WalletTransaction from "./WalletTransaction.model.js";
import Wallet from "./wallet.model.js";
import Rating from "./rating.model.js";
import Notification from "./notification.model.js";
import BankAccount from "./bankAccount.model.js";
import OTP from "./otp.model.js";
import PassengerProfile from "./passengerProfile.model.js";
import EmergencyContact from "./emergencyContact.model.js";
import PassengerDocument from "./passengerDocument.model.js";
import CorporateProfile from "./corporateProfile.model.js";
import CorporateDocument from "./corporateDocument.model.js";

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

// OTP
User.hasMany(OTP, {
    foreignKey: "userId",
    as: "otps",
    onDelete: "CASCADE",
});

OTP.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

// PASSENGER PROFILE

User.hasOne(PassengerProfile, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

PassengerProfile.belongsTo(User, {
    foreignKey: "userId",
});

PassengerProfile.hasOne(EmergencyContact, {
    foreignKey: "passengerProfileId",
    onDelete: "CASCADE",
});

EmergencyContact.belongsTo(PassengerProfile, {
    foreignKey: "passengerProfileId",
});

PassengerProfile.hasOne(PassengerDocument, {
    foreignKey: "passengerProfileId",
    onDelete: "CASCADE",
});

PassengerDocument.belongsTo(PassengerProfile, {
    foreignKey: "passengerProfileId",
});


// CORPORATE PROFILE

User.hasOne(CorporateProfile, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

CorporateProfile.belongsTo(User, {
    foreignKey: "userId",
});

CorporateProfile.hasOne(CorporateDocument, {
    foreignKey: "corporateProfileId",
    onDelete: "CASCADE",
});

CorporateDocument.belongsTo(CorporateProfile, {
    foreignKey: "corporateProfileId",
});

User.hasMany(Notification, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Notification.belongsTo(User, {
    foreignKey: "userId",
});

// Wallet
User.hasOne(Wallet, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Wallet.belongsTo(User, {
    foreignKey: "userId",
});

// Payment
User.hasMany(Payment, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Payment.belongsTo(User, {
    foreignKey: "userId",
});


// Wallet Transaction
Wallet.hasMany(WalletTransaction, {
    foreignKey: "walletId",
});

WalletTransaction.belongsTo(Wallet, {
    foreignKey: "walletId",
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
    OTP,
    PassengerProfile,
    EmergencyContact,
    PassengerDocument,
    CorporateProfile,
    CorporateDocument,
    WalletTransaction
};