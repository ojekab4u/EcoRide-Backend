import express from "express";
import { connectDB } from "./src/config/database.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import rideRoutes from "./src/routes/ride.routes.js";
import bookingRoutes from "./src/routes/booking.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";
import vehicleRoutes from "./src/routes/vehicle.routes.js";
import walletRoutes from "./src/routes/wallet.routes.js";
import ratingRoutes from "./src/routes/rating.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";


const app = express();


await connectDB();

app.get("/", (req, res) => {
  res.json({ message: "EcoRide API Running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/rides", rideRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/wallets", walletRoutes);
app.use("/api/v1/ratings", ratingRoutes);
app.use("/api/v1/notifications", notificationRoutes);
