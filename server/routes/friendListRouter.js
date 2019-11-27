import express from "express";
const router = express.Router();
import * as authController from "../controllers/authController";
import * as friendListController from "../controllers/friendListController";

// create a friendlist
router.post(
  "/",
  authController.checkAuth,
  friendListController.createFriendList
);

// Get friendlists for a user
router.get(
  "/:id",
  authController.checkAuth,
  friendListController.getFriendLists
);

// Delete a friendlist
router.delete(
  "/:id",
  authController.checkAuth,
  friendListController.deleteFriendList
);

export default router;
