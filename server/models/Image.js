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
  this.castBy.includes(userId)
    ? (this.castBy = this.castBy.filter(id => id != userId))
    : this.castBy.push(userId);
};

const Image = mongoose.model("Image", imageSchema);
export default Image;
