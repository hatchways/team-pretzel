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
  date: {
    type: Date,
    default: Date.now()
  }
});

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;
