import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image"
  },
  timestamp: {
    type: Number
  },
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll"
  }
});

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;
