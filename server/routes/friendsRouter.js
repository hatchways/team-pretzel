import express from "express";

const router = express.Router();

import * as friendsController from "../controllers/friendsController";
import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";

router.use(authController.checkAuth);

// Get all friends, including potential friends
router.get("/", userController.getMe, friendsController.getAllFriends);

// Update friends
router.patch("/:userId", userController.getMe, friendsController.updateFriends);

// Get suggested list of friends
// router.get("/suggest", userController.getMe, friendsController.suggestFriends);

export default router;
