import React from "react";
import { Formik } from "formik";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText
} from "@material-ui/core";
import { SignupSchema } from "../../utils/validation";

const styles = {
  formContainer: { display: "flex", flexDirection: "column" },
  formControl: { marginBottom: "1rem" },
  button: {
    borderRadius: "9999px",
    display: "inline-block",
    textDecoration: "none",
    backgroundColor: "#111",
    color: "white",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    marginBottom: ".5rem",
    fontSize: "1rem"
  }
};

const SignupForms = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={SignupSchema}
      validateOnChange={false}
      onSubmit={async (
        { name, email, password, confirmPassword },
        { setSubmitting }
      ) => {
        // send values to backend endpoints
        const newUser = {
          name,
          email,
          password,
          passwordConfirm: confirmPassword
        };
        const res = await axios.post("/signup", newUser);
        console.log(res);
        setSubmitting(false);
      }}
    >
      {({ errors, handleSubmit, handleChange, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div style={styles.formContainer}>
              <FormControl style={styles.formControl}>
                <InputLabel shrink={true}>Your name</InputLabel>
                <Input
                  error={errors.name ? true : false}
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name ? (
                  <FormHelperText error>{errors.name}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl style={styles.formControl}>
                <InputLabel shrink={true}>Email Address</InputLabel>
                <Input
                  error={errors.email ? true : false}
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email ? (
                  <FormHelperText error>{errors.email}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl style={styles.formControl}>
                <InputLabel shrink={true}>Password</InputLabel>
                <Input
                  error={errors.password ? true : false}
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password ? (
                  <FormHelperText error>{errors.password}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl style={styles.formControl}>
                <InputLabel shrink={true}>Confirm Password</InputLabel>
                <Input
                  error={errors.confirmPassword ? true : false}
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword ? (
                  <FormHelperText error>
                    {errors.confirmPassword}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>
            <Button style={styles.button} type="submit">
              Create
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default SignupForms;
