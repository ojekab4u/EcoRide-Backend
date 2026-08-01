import express from "express";
import { autocomplete } from "../controllers/maps.controller.js";

const router = express.Router();

router.get("/autocomplete", autocomplete);

export default router;