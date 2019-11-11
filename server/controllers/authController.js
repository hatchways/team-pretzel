import jwt from "jsonwebtoken";
import { promisify } from "util";
import jwtSignToken from "../utils/jwtSignToken";
import catchAsync from "../utils/catchAsync";
import User from "../models/User";
import AppError from "../utils/AppError";

export const signup = catchAsync(async (req, res, next) => {
  // Check if passwords match

  const { password, passwordConfirm } = req.body;

  if (password !== passwordConfirm)
    return next(new AppError("Passwords do not match.", 400));

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  const token = jwtSignToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: { user: newUser }
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!email || !password)
    return next(
      new AppError("Please log in with both your email and password.", 400)
    );

  if (!user || !(await user.isPasswordCorrect(password, user.password)))
    return next(
      new AppError("Wrong email and/or password. Please try again", 401)
    );

  const token = jwtSignToken(user._id);

  res.status(200).json({
    status: "success",
    token
  });
});

export const checkAuth = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError("Please log in to get access.", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new AppError("User no longer exists.", 404));

  req.user = currentUser;
  next();
});
