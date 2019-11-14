import express from "express";
const router = express.Router();
import * as authController from "../controllers/authController";
import { createFriendList } from "../controllers/friendlistController";

// create a friendlist
router.use(authController.checkAuth);
router.post("/new-friend-list", createFriendList);

export default router;
