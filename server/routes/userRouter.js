import express from "express";
const router = express.Router();

import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";

router.get("/", userController.getAllUsers);
router.post("/", authController.signup);
router.post("/login", authController.login);

/* PROTECTED ROUTES */
router.use(authController.checkAuth);
// profile
router.get("/profile", userController.getMe, userController.getUser);
router.patch(
  "/profile",
  userController.uploadUserAvatar,
  userController.updateMe
);
// tagged polls
router.get(
  "/profile/polls",
  userController.getMe,
  userController.getTaggedPolls
);

export default router;
