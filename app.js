import express from "express";
import { connectDB } from "./src/config/database.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import rideRoutes from "./src/routes/ride.routes.js";
import bookingRoutes from "./src/routes/booking.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";
import driverRoutes from "./src/routes/driver.routes.js";
import mapsRoutes from "./src/routes/maps.routes.js";
import vehicleRoutes from "./src/routes/vehicle.routes.js";
import driverDocumentRoutes from "./src/routes/driverDocument.routes.js";
import vehicleInspectionRoutes from "./src/routes/vehicleInspection.routes.js";
import passengerRoutes from "./src/routes/passenger.routes.js";
import passengerDocumentRoutes from "./src/routes/passengerDocument.routes.js";

// import walletRoutes from "./src/routes/wallet.routes.js";
// import ratingRoutes from "./src/routes/rating.routes.js";

import errorHandler from "./src/middlewares/error.middleware.js";
import otpRoutes from "./src/routes/otp.routes.js";

import testRoutes from "./src/routes/test.routes.js";

import adminRoutes from "./src/routes/admin.routes.js";

import tripRoutes from "./src/routes/trip.routes.js";
import dashboardRoutes from "./src/routes/dashboard.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";
import earningRoutes from "./src/routes/earning.routes.js";
import requestLogger from "./src/middlewares/requestLogger.middleware.js";


const app = express();


await connectDB();

app.get("/", (req, res) => {
  res.json({ message: "EcoRide API Running" });
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/rides", rideRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/drivers", driverRoutes);
app.use("/api/v1/passengers", passengerRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);
app.use("/api/v1/trips", tripRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/driver/earnings", earningRoutes
);
app.use("/api/v1/admin", adminRoutes);
app.use(
  "/api/v1/driver-documents",
  driverDocumentRoutes
);
app.use(
  "/api/v1/vehicle-inspections",
  vehicleInspectionRoutes
);
app.use(
  "/api/v1/passenger-documents",
  passengerDocumentRoutes
);
app.use("/api/v1/maps", mapsRoutes);

// app.use("/api/v1/wallets", walletRoutes);
// app.use("/api/v1/ratings", ratingRoutes);
app.use("/api/v1/test", testRoutes);

app.use("/api/v1/otp", otpRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
