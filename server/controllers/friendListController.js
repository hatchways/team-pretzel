import FriendList from "../models/FriendList";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

export const createFriendList = catchAsync(async (req, res, next) => {
  const { friendIds, title } = req.body;
  if (friendIds.length === 0) {
    return next(new AppError("No friends were selected", 400));
  }

  const newFriendList = await FriendList.create({
    title,
    friends: [...friendIds],
    user: req.user._id
  });

  res.status(201).json({
    status: "success",
    data: { friendList: newFriendList }
  });
});

// Get all friend lists for a user
export const getFriendLists = catchAsync(async (req, res) => {
  const friendLists = await FriendList.find({ user: req.params.id }).populate(
    "friends"
  );

  res.json({
    status: "success",
    friendLists
  });
});
