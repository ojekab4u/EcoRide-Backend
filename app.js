import express from "express";
import { connectDB } from "./src/config/database.js";


const app = express();

app.use(express.json());

await connectDB();

app.get("/", (req, res) => {
  res.json({ message: "EcoRide API Running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});