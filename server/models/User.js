import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    name: {
      type: String,
      required: [true, "Please tell us your name"]
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email address"]
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Your password must have at least 8 characters"],
      select: false
    },
    avatar: String,
    online: {
      type: Boolean,
      default: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// virtual populate
userSchema.virtual("polls", {
  ref: "Poll",
  foreignField: "createdBy",
  localField: "_id"
});

userSchema.virtual("friendLists", {
  ref: "FriendList",
  foreignField: "user",
  localField: "_id"
});

userSchema.virtual("friends", {
  ref: "Friends",
  foreignField: "user",
  localField: "_id"
});

// hash password before saving to database
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// compare non-hashed (original) and hashed passwords
userSchema.methods.isPasswordCorrect = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// set status
userSchema.methods.setOnline = function() {
  // if (!this.online) this.online = true;
  this.online = true;
  return this;
};

userSchema.methods.setOffline = function() {
  // if (this.online) this.online = false;
  this.online = false;
  return this;
};

const User = mongoose.model("User", userSchema);
export default User;
