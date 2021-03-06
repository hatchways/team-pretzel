import React from "react";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core";
import PollsContainer from "./PollsContainer";
import FriendListContainer from "./FriendListContainer";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "4rem"
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    padding: "1rem 0.5rem"
  }
});

const DashboardDefault = ({ user, match, history }) => {
  const classes = useStyles();

  return (
    <>
      <PollsContainer classes={classes} user={user} />
      <FriendListContainer classes={classes} user={user} />
    </>
  );
};

export default withRouter(DashboardDefault);
