import express from "express";

import {
register,
login,
changeUserPassword,
forgotPassword,
resetPassword,
} from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} from "../validators/auth.validator.js";

import validate from "../middlewares/validate.middleware.js";
import protect from "../middlewares/auth.middleware.js";

import {
    getMyProfile,
    updateMyProfile,
} from "../controllers/user.controller.js";

import {
    updateProfileValidator,
} from "../validators/user.validator.js";


const router = express.Router();

router.post("/register", register);

router.post("/login", login);
router.patch(

    "/change-password",

    protect,
    changePasswordValidator,
    validate,
    changeUserPassword,
);

router.post(
    "/forgot-password",
    forgotPasswordValidator,
    validate,
    forgotPassword
);

router.post(
    "/reset-password/:token",
    resetPasswordValidator,
    validate,
    resetPassword
);
export default router;