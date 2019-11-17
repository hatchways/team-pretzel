import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: String,
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

imageSchema.methods.vote = function(userId) {
  let voters = this.castBy;
  voters = voters.includes(userId)
    ? voters.filter(id => id !== userId)
    : voters.push(userId);
};

const Image = mongoose.model("Image", imageSchema);
export default Image;
