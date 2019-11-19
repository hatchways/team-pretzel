import express from "express";
const router = express.Router();
import * as authController from "../controllers/authController";
import { createFriendList } from "../controllers/friendListController";

// create a friendlist
router.use(authController.checkAuth);
router.post("/", createFriendList);

export default router;
