import jwt from "jsonwebtoken";
import { promisify } from "util";
import jwtSignToken from "../utils/jwtSignToken";
import User from "../models/userModel";

export const signup = async (req, res, next) => {
  // Check if passwords match
  const { password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
    return res.status(400).json({
      status: "failure",
      message: "Passwords do not match"
    });
  }

  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    const token = jwtSignToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: { user: newUser }
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!email || !password)
    res.status(400).json({
      status: "failure",
      message: "Please log in with both your email and password."
    });

  if (!user || !(await user.isPasswordCorrect(password, user.password)))
    res.status(401).json({
      status: "failure",
      message: "Wrong email and/or password. Please try again"
    });

  const token = jwtSignToken(user._id);

  res.status(200).json({
    status: "success",
    token
  });
};

export const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token)
    res.status(401).json({
      status: "failure",
      message: "Please log in to get access."
    });

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    res.status(400).json({
      status: "failure",
      message: "User no longer exists"
    });

  req.user = currentUser;
  next();
};
