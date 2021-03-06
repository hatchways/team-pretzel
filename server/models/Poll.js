import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question cannot be empty"]
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image"
    }
  ],
  taggedFriendLists: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FriendList"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A poll must belong to a user"]
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  __v: {
    type: Number,
    select: false
  }
});

pollSchema.methods.getOtherImage = function(currentImageId) {
  return this.images.filter(imageId => imageId != currentImageId)[0];
};

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
