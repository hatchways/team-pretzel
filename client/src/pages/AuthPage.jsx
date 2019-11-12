import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Fab } from "@material-ui/core";

import SignIn from "./container/SignIn";
import SignUp from "./container/SignUp";
import authBackgroundImage from "../assets/authBackgroundImage.png";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  paper: {
    background: "transparent",
    textAlign: "center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  gridBackground: {
    backgroundImage: `url(${authBackgroundImage})`,
    backgroundPosition: "right",
    backgroundSize: "cover",
    height: "100%"
  },
  fab: {
    padding: "0 2.5rem",
    color: "#fff",
    background: "transparent",
    position: "absolute",
    top: "3rem",
    right: "3rem"
  }
});

const AuthPage = ({ location, history }) => {
  const classes = useStyles();
  const { pathname } = location;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs>
          <Paper className={classes.paper}>
            {pathname === "/signup" ? (
              <SignUp history={history} />
            ) : pathname === "/signin" ? (
              <SignIn history={history} />
            ) : null}
          </Paper>
        </Grid>

        <Grid item xs className={classes.gridBackground}>
          <Paper className={classes.paper}>
            {pathname === "/signup" ? (
              <Link to="/signin">
                <Fab variant="extended" className={classes.fab}>
                  Sign in
                </Fab>
              </Link>
            ) : pathname === "/signin" ? (
              <Link to="/signup">
                <Fab variant="extended" className={classes.fab}>
                  Sign up
                </Fab>
              </Link>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthPage;
