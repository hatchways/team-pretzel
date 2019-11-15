import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll"
  },
  count: {
    type: Number
  },
  castBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  __v: {
    type: Number,
    select: false
  }
});

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;
