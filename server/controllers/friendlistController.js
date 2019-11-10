import FriendList from "../models/FriendList";

export const createFriendList = async (req, res) => {
  // accept title + friends = array of ids + user (owner) id from jwt token
  const { title, friendIds } = req.body;
  const { id } = req.user;
  try {
    const newFriendList = await FriendList.create({
      title,
      friends: [...friendIds],
      user: id
    });

    newFriendList.save();

    return res.json(newFriendList);
  } catch (error) {
    return res.status(400).json(error);
  }
};
