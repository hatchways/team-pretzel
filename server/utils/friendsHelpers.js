import Friends from "../models/Friends";

export const getUpdatedFriends = async friendsId => {
  try {
    const friends = await Friends.findById(friendsId).populate("friends");
    console.log(friends);
    return friends;
  } catch (err) {
    console.log(err);
  }
};
