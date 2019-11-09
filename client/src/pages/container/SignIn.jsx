import React from "react";
import { Typography } from "@material-ui/core";
import SigninForm from "../presentational/SigninForm";

const SignIn = () => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%"
      }}
    >
      <div style={{ width: "60%" }}>
        <Typography
          variant="h4"
          align="left"
          style={{ fontWeight: "bold", marginBottom: "2.5rem" }}
        >
          Sign in
        </Typography>
        <SigninForm />
      </div>
    </section>
  );
};

export default SignIn;
