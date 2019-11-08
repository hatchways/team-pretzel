import React from "react";
import { Formik } from "formik";
import { Button } from "@material-ui/core";
import { SigninSchema } from "../../utils/validation";
import FormFields from "./FormFields";
import { styles } from "./inlineStyles";
import { JWTtoLocalStorage } from "../../utils/utils";
import axios from "axios";

const SigninForms = () => {
  return (
    <Formik
      validationSchema={SigninSchema}
      validateOnChange={false}
      initialValues={{ email: "", password: "" }}
      onSubmit={async ({ email, password }, { setSubmitting }) => {
        const user = { email, password };
        // send values to backend endpoints
        const res = await axios.post("/api/v1/users/login", user);
        const { token } = res.data;

        // set token to lstorage
        JWTtoLocalStorage(token);
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, errors, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div style={styles.formContainer}>
              <FormFields
                label="Email Address"
                error={errors.email ? true : false}
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                errors={errors.email}
              />
              <FormFields
                label="Password"
                error={errors.password ? true : false}
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                errors={errors.password}
              />
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
