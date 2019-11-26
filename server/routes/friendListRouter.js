import express from "express";
const router = express.Router();
import * as authController from "../controllers/authController";
import {
  createFriendList,
  getFriendLists
} from "../controllers/friendListController";

// create a friendlist
router.use(authController.checkAuth);
router.post("/", createFriendList);

router.get("/:id", authController.checkAuth, getFriendLists);

export default router;
