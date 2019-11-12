import React from "react";
import { Typography } from "@material-ui/core";
import SigninForm from "../presentational/SigninForm";

const SignIn = ({ history }) => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "70%"
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
        <SigninForm history={history} />
      </div>
    </section>
  );
};

export default SignIn;
