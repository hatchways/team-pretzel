import User from "../models/userModel";
import multerUpload from "../utils/multerUpload";

export const uploadUserAvatar = multerUpload.single("avatar");

const filterObj = (obj, ...allowedFields) => {
  let newObj = {};
  Object.keys(obj).forEach(key => {
    if (allowedFields.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

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

export const updateMe = async (req, res, next) => {
  if (req.body.password)
    res.status(400).json({
      status: "failure",
      message: "This route is not for password updates"
    });

  const filteredBody = filterObj(req.body, "name");
  if (req.file) filteredBody.avatar = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: "success",
    data: { user: updatedUser }
  });
};
