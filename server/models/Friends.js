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
  },
  __v: {
    type: Number,
    select: false
  }
});

friendsSchema.methods.befriend = function(friend) {
  this.friends.some(currentFriend => currentFriend.id === friend.id)
    ? (this.friends = this.friends.filter(
        currentFriend => currentFriend.id != friend.id
      ))
    : this.friends.push(friend);
};

friendsSchema.methods.suggestFriends = function(allUsers) {
  let potentialFriends = [];

  potentialFriends = allUsers.filter(
    user => !this.friends.find(friend => friend.id == user.id)
  );

  return potentialFriends;
};

const Friends = mongoose.model("Friends", friendsSchema);
export default Friends;
