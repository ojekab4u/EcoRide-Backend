import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadTest } from "../controllers/test.controller.js";

const router = express.Router();

router.post(
    "/upload",
    upload.single("image"),
    uploadTest
);

export default router;