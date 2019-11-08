import express from "express";

const router = express.Router();

import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";

router.get("/", userController.getAllUsers);
// router.get("/:id", userController.getUser);

router.get("/", userController.getAllUsers);
// router.get("/:id", userController.getUser);

router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Protected routes
router.use(authController.checkAuth);
router.get("/profile", userController.getMe, userController.getUser);
router.patch(
  "/profile/update",
  userController.uploadUserAvatar,
  // userController.resizeUserAvatar,
  userController.updateMe
);

export default router;
