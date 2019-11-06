import express from "express";

const router = express.Router();

import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.use(authController.checkAuth);
router.get("/profile", userController.getMe, userController.getUser);
router.patch(
  "/profile/update",
  userController.uploadUserAvatar,
  userController.updateMe
);

export default router;
