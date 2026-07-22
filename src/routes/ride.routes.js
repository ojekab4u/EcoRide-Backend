import express from "express";

import {
createRide,
getAllRides,
getRideById,
updateRide,
deleteRide
} from "../controllers/ride.controller.js";

const router = express.Router();

router.post("/", createRide);

router.get("/", getAllRides);

router.get("/:id", getRideById);

router.put("/:id", updateRide);

router.delete("/:id", deleteRide);

export default router;