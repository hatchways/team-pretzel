import express from "express";
const router = express.Router();
import * as authController from "../controllers/authController";
import { createFriendList } from "../controllers/friendlistController";

// test friendlist route
router.get("/", (req, res) => {
  return res.json({ msg: "this is the friendlist route" });
});

// create a friendlist
router.use(authController.checkAuth);
router.post("/create", createFriendList);

export default router;
