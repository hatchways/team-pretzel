import Friends from "../models/Friends";
import User from "../models/User";
import catchAsync from "../utils/catchAsync";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

// Find all friends
export const getAllFriends = catchAsync(async (req, res, next) => {
  const friends = await Friends.findOne({ user: req.params.id });

  res.status(200).json({
    status: "success",
    friends
  });
});

// Add a friend
export const addFriend = catchAsync(async (req, res, next) => {
  const { id, friendId } = req.params;

  const isFriend = await Friends.findOne({
    user: id,
    friends: friendId
  });

  if (!isFriend) {
    const friend = await Friends.findOneAndUpdate(
      { user: id },
      { $push: { friends: friendId } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      status: "success",
      friend
    });
  } else {
    res.status(304).json({ status: "no change" });
  }
});

// Remove a friend
export const removeFriend = catchAsync(async (req, res, next) => {
  const { id, friendId } = req.params;

  const isFriend = await Friends.findOne({
    user: id,
    friends: friendId
  });

  if (isFriend) {
    const friend = await Friends.findOneAndUpdate(
      { user: id },
      { $pull: { friends: friendId } },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      friend
    });
  } else {
    res.status(304).json({ status: "no change" });
  }
});

// Get suggested list of friends
export const suggestedFriends = catchAsync(async (req, res, next) => {
  const currentFriends = await Friends.findOne({ user: req.params.id });
  currentFriends.friends.push(req.params.id);

  const users = await User.find({});

  const potentialFriends = [];

  users.filter(user => {
    if (!currentFriends.friends.includes(user._id)) {
      potentialFriends.push(user);
    }
  });

  res.status(200).json({
    status: "success",
    potentialFriends
  });
});
