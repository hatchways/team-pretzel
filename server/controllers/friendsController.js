import Friends from "../models/Friends";
import User from "../models/User";
import catchAsync from "../utils/catchAsync";
import { getUpdatedFriends } from "../utils/friendsHelpers";

// Find all friends
export const getAllFriends = catchAsync(async (req, res, next) => {
  let friends = await Friends.findOne({ user: req.user.id }).populate(
    "friends"
  );

  // handle case where new user has no friends
  if (!friends) friends = [];

  // get suggested friends
  const { potentialFriends } = await getUpdatedFriends(friends._id);

  res.status(200).json({
    status: "success",
    friends,
    potentialFriends
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

  res.status(201).json({
    status: "success",
    friends
  });
});
