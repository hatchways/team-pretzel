import Friends from "../models/Friends";
import User from "../models/User";
import catchAsync from "../utils/catchAsync";

// Find all friends
export const getAllFriends = catchAsync(async (req, res, next) => {
  let friends = await Friends.findOne({ user: req.user.id }).populate(
    "friends"
  );

  // handle case where new user has no friends
  if (!friends) friends = [];

  res.status(200).json({
    status: "success",
    friends
  });
});

// Add or remove a friend
export const updateFriends = catchAsync(async (req, res, next) => {
  let friends = await Friends.findOne({ user: req.user.id }).populate(
    "friends"
  );

  const friend = await User.findById(req.params.userId);

  if (!friends) {
    friends = await Friends.create({ user: req.user.id });
  }

  friends.befriend(friend);
  await friends.save();

  console.log(friends);

  res.status(201).json({
    status: "success",
    friends
  });
});

// Get suggested list of friends
export const suggestFriends = catchAsync(async (req, res, next) => {
  const currentFriends = await Friends.findOne({ user: req.user.id });
  let allUsers = await User.find();
  allUsers = allUsers.filter(user => user.id != req.user.id);

  const potentialFriends = currentFriends
    ? currentFriends.suggestFriends(allUsers)
    : allUsers;

  res.status(200).json({
    status: "success",
    potentialFriends
  });
});
