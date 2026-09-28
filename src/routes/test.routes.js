import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadTest, testEmail } from "../controllers/test.controller.js";

const router = express.Router();

router.post(
    "/upload",
    upload.single("image"),
    uploadTest
);

router.post("/email", testEmail);

export default router;