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

import { selectRoleService } from "../services/selectRole.service.js";
import { selectRoleValidator } from "../validators/selectRole.validator.js";
import { selectRole } from "../controllers/selectRole.controller.js";
import validate from "../middlewares/validate.middleware.js";
import protect from "../middlewares/auth.middleware.js";



const router = express.Router();

router.post("/register", register);

router.post("/login", login);
router.patch(
    "/select-role",
    protect,
    selectRoleValidator,
    validate,
    selectRole
);
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