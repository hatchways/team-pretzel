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

friendsSchema.methods.befriend = function(userId) {
  this.friends.includes(userId)
    ? (this.friends = this.friends.filter(id => id != userId))
    : this.friends.push(userId);
};

friendsSchema.methods.suggestFriends = function(allUsers) {
  let potentialFriends = [];

  allUsers.filter(user => {
    if (!this.friends.includes(user.id)) potentialFriends.push(user);
  });
  return potentialFriends;
};

const Friends = mongoose.model("Friends", friendsSchema);
export default Friends;
