import express from "express";

const router = express.Router();

import * as friendsController from "../controllers/friendsController";
import * as authController from "../controllers/authController";

// Get all friends
router.get("/:id", authController.checkAuth, friendsController.getAllFriends);

// Add new friend
router.put(
  "/:id/add-friend/:friendId",
  authController.checkAuth,
  friendsController.addFriend
);

// Remove a friend
router.put(
  "/:id/remove-friend/:friendId",
  authController.checkAuth,
  friendsController.removeFriend
);

// Get suggested list of friends
router.get(
  "/suggested-friends/:id",
  authController.checkAuth,
  friendsController.suggestedFriends
);

export default router;
