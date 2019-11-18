import mongoose from "mongoose";

const friendsSchema = new mongoose.Schema({
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Friends = mongoose.model("Friends", friendsSchema);
export default Friends;
