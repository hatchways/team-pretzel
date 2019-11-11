import FriendList from "../models/FriendList";

export const createFriendList = async (req, res) => {
  const { friendIds } = req.body;
  if (friendIds.length === 0) {
    res
      .status(400)
      .json({ status: "failure", message: "No friends were selected" });
  }

  const newFriendList = await FriendList.create(req.body);
  res
    .status(201)
    .json({ status: "success", data: { friendList: newFriendList } });
};
