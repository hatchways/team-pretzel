import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  friendList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FriendList"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
