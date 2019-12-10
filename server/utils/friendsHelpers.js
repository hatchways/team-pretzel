import Friends from "../models/Friends";
import User from "../models/User";

export const getUpdatedFriends = async friendsId => {
  try {
    const friends = await Friends.findById(friendsId).populate("friends");

    let allUsers = await User.find();
    allUsers = allUsers.filter(user => user.id != friends.user);

    const potentialFriends = friends
      ? friends.suggestFriends(allUsers)
      : allUsers;

    return { friends, potentialFriends };
  } catch (err) {
    console.log(err);
  }
};
