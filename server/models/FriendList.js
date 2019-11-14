import mongoose from "mongoose";

const friendListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  __v: {
    type: Number,
    select: false
  }
});

const FriendList = mongoose.model("FriendList", friendListSchema);
export default FriendList;
