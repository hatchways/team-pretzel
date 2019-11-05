import User from "../models/userModel";

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  user
    ? res.status(200).json({
        status: "success",
        data: { user }
      })
    : next(new AppError("No user found with that ID", 404));
};

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
