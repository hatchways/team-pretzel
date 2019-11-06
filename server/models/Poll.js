import mongoose from "mongoose";

const pollSchema = new mongoose.Schema(
  {
    //question,image,image,friendlist,user
    question: {
      type: String,
      required: [true, "Question cannot be empty"]
    },
    images: [String],
    friendList: {
      type: String
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: [true, "A poll must belong to a user"]
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// pollSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: "user",
//     select: "name avatar"
//   });
//   next();
// });

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
