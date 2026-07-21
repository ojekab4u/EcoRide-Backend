import User from "./user.model.js";
import Ride from "./ride.model.js";
import Booking from "./booking.model.js";
import Vehicle from "./vehicle.model.js";

User.hasMany(Ride);

Ride.belongsTo(User);

Ride.hasMany(Booking);

Booking.belongsTo(Ride);

Vehicle.belongsTo(User);

User.hasOne(Vehicle);

export {
    User,
    Ride,
    Booking,
    Vehicle
};