import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2)
    .required("Please tell us your name"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Please provide your email"),
  password: yup
    .string()
    .min(8, "Your password must have at least 8 characters")
    .required("Please enter a password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm password")
});

export const SigninSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Please provide your email"),
  password: yup.string().required("Please enter a password")
});

export const FriendListSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Title is required"),
  friendsToAdd: yup.array().required("You need to add friends!")
});
