import React from "react";
import { Formik } from "formik";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText
} from "@material-ui/core";
import { SigninSchema } from "../../utils/validation";

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

const SigninForms = () => {
  return (
    <Formik
      validationSchema={SigninSchema}
      validateOnChange={false}
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        // send values to backend endpoints
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, errors, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div style={styles.formContainer}>
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
            </div>
            <Button style={styles.button} type="submit">
              Sign in
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default SigninForms;
