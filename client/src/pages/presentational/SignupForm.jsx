import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { Button } from "@material-ui/core";
import FormFields from "./FormFields";
import { SignupSchema } from "../../utils/validation";
import { styles } from "./inlineStyles";
import { JWTtoLocalStorage } from "../../utils/helpers";

const SignupForms = ({ history }) => {
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
        const res = await axios.post("/api/v1/users/signup", newUser);

        const { data, token } = res.data;
        // set token to localStorage
        JWTtoLocalStorage(token);
        history.push("/dashboard");
        setSubmitting(false);
      }}
    >
      {({ errors, handleSubmit, handleChange, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div style={styles.formContainer}>
              <FormFields
                name="name"
                label="Your name"
                error={errors.name ? true : false}
                type="text"
                value={values.name}
                onChange={handleChange}
                errors={errors.name}
              />
              <FormFields
                name="email"
                label="Email Address"
                error={errors.email ? true : false}
                type="text"
                value={values.email}
                onChange={handleChange}
                errors={errors.email}
              />
              <FormFields
                name="password"
                label="Password"
                error={errors.password ? true : false}
                type="password"
                value={values.password}
                onChange={handleChange}
                errors={errors.password}
              />
              <FormFields
                name="confirmPassword"
                label="Confirm Password"
                error={errors.confirmPassword ? true : false}
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                errors={errors.confirmPassword}
              />
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
