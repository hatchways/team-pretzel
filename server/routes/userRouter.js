import express from "express";
import multer from "multer";

const upload = multer({ dest: "public/img/users" });
const router = express.Router();

import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.use(authController.checkAuth);
router.get("/profile", userController.getMe, userController.getUser);

export default router;
