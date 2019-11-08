import mongoose from "mongoose";

const pollSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// populate "user" on each poll
// pollSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: "user",
//     select: "name"
//   });
//   next();
// });

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
