import User from "../models/User";

export const setOnlineStatus = async userId => {
  try {
    let user = await User.findById(userId);
    user = user.setOnline();
    await user.save();
  } catch (err) {
    console.log(err);
  }
};

export const setOfflineStatus = async userId => {
  try {
    let user = await User.findById(userId);
    user = user.setOffline();
    await user.save();
  } catch (err) {
    console.log(err);
  }
};
