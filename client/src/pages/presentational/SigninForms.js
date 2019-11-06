import React from "react";
import { Formik } from "formik";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

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
      initialValues={{ email: "", password: "" }}
      onSubmit={values => {
        // send values to backend endpoints
        console.log(values);
      }}
    >
      {props => {
        return (
          <form onSubmit={props.handleSubmit}>
            <div style={styles.formContainer}>
              <FormControl style={styles.formControl}>
                <InputLabel shrink={true}>Email Address</InputLabel>
                <Input
                  type="email"
                  name="email"
                  value={props.values.email}
                  onChange={props.handleChange}
                />
              </FormControl>
              <FormControl style={styles.formControl}>
                <InputLabel shrink={true}>Password</InputLabel>
                <Input
                  type="password"
                  name="password"
                  value={props.values.password}
                  onChange={props.handleChange}
                />
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
