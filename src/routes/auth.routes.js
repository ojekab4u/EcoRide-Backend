import express from "express";

import {
register,
login
} from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";

import validate from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

export default router;