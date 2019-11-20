import express from "express";

const router = express.Router();

import * as friendsController from "../controllers/friendsController";
import * as authController from "../controllers/authController";

// Get all friends
router.get("/:id", authController.checkAuth, friendsController.getAllFriends);

// Update friends
router.put(
  "/:id/:userId",
  authController.checkAuth,
  friendsController.updateFriends
);

// Get suggested list of friends
router.get(
  "/:id/suggest",
  authController.checkAuth,
  friendsController.suggestFriends
);

export default router;
