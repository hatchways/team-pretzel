import express from "express";
const router = express.Router();
import FriendList from "../models/FriendList";
import * as authController from "../controllers/authController";

// test friendlist route
router.get("/", (req, res) => {
  return res.json({ msg: "this is the friendlist route" });
});

// create a friendlist
router.use(authController.checkAuth);
router.post("/create", async (req, res) => {
  // accept title + friends = array of ids + user (owner) id from jwt token
  const { title, friendIds } = req.body;
  const { id } = req.user;
  console.log(id);
  try {
    const newFriendList = await FriendList.create({
      title,
      friends: [...friendIds],
      user: id
    });

    newFriendList.save();

    return res.json(newFriendList);
  } catch (error) {
    console.log(error);
  }
});

export default router;
