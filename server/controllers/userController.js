import User from "../models/User";
import AppError from "../utils/AppError";
import multerUpload from "../utils/multerUpload";
import catchAsync from "../utils/catchAsync";

export const uploadUserAvatar = multerUpload.single("avatar");

const filterObj = (obj, ...allowedFields) => {
  let newObj = {};
  Object.keys(obj).forEach(key => {
    if (allowedFields.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: { users }
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("polls");
  if (!user) return next(new AppError("No user found with that ID.", 404));

  res.status(200).json({
    status: "success",
    data: { user }
  });
});

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password)
    return next(new AppError("This route is not for password updates.", 400));

  const filteredBody = filterObj(req.body, "name");
  if (req.file) filteredBody.avatar = req.file.location;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: "success",
    data: { user: updatedUser }
  });
});
