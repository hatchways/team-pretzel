import React from "react";
import { Typography } from "@material-ui/core";
import SigninForms from "./presentational/SigninForms";

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
        <SigninForms />
      </div>
    </section>
  );
};

export default SignIn;
