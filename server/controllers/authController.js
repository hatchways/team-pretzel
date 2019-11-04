import jwt from "jsonwebtoken";
import jwtSignToken from "../utils/jwtSignToken";
import User from "../models/userModel";

export const signup = async (req, res, next) => {
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
