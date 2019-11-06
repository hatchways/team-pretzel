import React from "react";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const styles = {
  link: {
    borderRadius: "9999px",
    display: "inline-block",
    textDecoration: "none",
    backgroundColor: "white",
    color: "black",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    marginBottom: ".5rem",
    fontSize: "1rem",
    position: "absolute",
    right: "3rem",
    top: "3rem"
  }
};

const AuthPage = ({ location }) => {
  const { pathname } = location;
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {pathname === "/signup" ? (
        <SignUp />
      ) : pathname === "/signin" ? (
        <SignIn />
      ) : null}
      <section
        style={{ backgroundColor: "black", height: "100%", width: "50%" }}
      >
        {pathname === "/signup" ? (
          <Link style={styles.link} to="/signin">
            Sign in
          </Link>
        ) : pathname === "/signin" ? (
          <Link style={styles.link} to="/signup">
            Sign up
          </Link>
        ) : null}
      </section>
    </div>
  );
};

export default AuthPage;
