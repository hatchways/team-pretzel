import mongoose from "mongoose";

const friendListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  friends: [
    {
      type: String,
      required: true
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const FriendList = mongoose.model("FriendList", friendListSchema);
export default FriendList;