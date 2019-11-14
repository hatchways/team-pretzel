import express from "express";

const router = express.Router();

import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";

router.get("/", userController.getAllUsers);

router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Protected routes
router.use(authController.checkAuth);
router.get("/profile", userController.getMe, userController.getUser);
router.get(
  "/profile/getTaggedPolls",
  userController.getMe,
  userController.getTaggedPolls
);
router.patch(
  "/profile/update",
  userController.uploadUserAvatar,

  userController.updateMe
);

export default router;
