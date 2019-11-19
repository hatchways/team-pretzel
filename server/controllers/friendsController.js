import Friends from "../models/Friends";
import User from "../models/User";
import catchAsync from "../utils/catchAsync";

// Find all friends
export const getAllFriends = catchAsync(async (req, res, next) => {
  const friends = await Friends.findOne({ user: req.params.id });

  res.status(200).json({
    status: "success",
    friends
  });
});

// Add or remove a friend
export const updateFriends = catchAsync(async (req, res, next) => {
  const friends = await Friends.findById(req.params.friendsId);
  friends.befriend(req.params.userId);
  await friends.save();

  res.status(201).json({
    status: "success",
    friends
  });
});

// Get suggested list of friends
export const suggestedFriends = catchAsync(async (req, res, next) => {
  const currentFriends = await Friends.findOne({ user: req.params.id });
  const users = await User.find({});
  let potentialFriends = [];

  if (!currentFriends) {
    potentialFriends = users.filter(user => {
      return user.id !== req.params.id;
    });
    res.status(200).json({ status: "success", potentialFriends });
  } else {
    users.filter(user => {
      if (!currentFriends.friends.includes(user._id)) {
        potentialFriends.push(user);
      }
    });
    res.status(200).json({
      status: "success",
      potentialFriends
    });
  }
});
