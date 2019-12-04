import React from "react";
import { Typography } from "@material-ui/core";
import SignupForm from "./SignupForm";

const SignUp = ({ history }) => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "70%"
      }}
    >
      <div>
        <Typography
          variant="h4"
          align="left"
          style={{ fontWeight: "bold", marginBottom: "2.5rem" }}
        >
          Create an account
        </Typography>
        <SignupForm history={history} />
      </div>
    </section>
  );
};

export default SignUp;
