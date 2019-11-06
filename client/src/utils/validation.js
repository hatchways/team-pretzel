import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2)
    .required("Please tell us your name"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please provide your email"),
  password: yup
    .string()
    .min(8, "Your password must have at least 8 characters")
    .required("Please enter a password")
});

export const SigninSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please provide your email"),
  password: yup.string().required("Please enter a password")
});