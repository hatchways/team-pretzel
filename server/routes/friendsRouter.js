import express from "express";

const router = express.Router();

import * as friendsController from "../controllers/friendsController";
import * as authController from "../controllers/authController";

// Get all friends
router.get("/:id", authController.checkAuth, friendsController.getAllFriends);

// Update friends
router.put(
  "/:friendsId/:userId",
  authController.checkAuth,
  friendsController.updateFriends
);

// Get suggested list of friends
router.get(
  "/suggested-friends/:id",
  authController.checkAuth,
  friendsController.suggestedFriends
);

export default router;
