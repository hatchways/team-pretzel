import User from "../models/userModel";

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  user
    ? res.status(200).json({
        status: "success",
        data: { user }
      })
    : res.status(404).json({
        status: "failure",
        message: "No user found with that ID"
      });
};

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
