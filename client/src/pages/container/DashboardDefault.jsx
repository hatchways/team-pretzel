import React from "react";
import { withRouter } from "react-router";
import { Container, Divider, makeStyles } from "@material-ui/core";
import PollsContainer from "./PollsContainer";
import FriendListContainer from "./FriendListContainer";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "2rem"
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    padding: "2rem 0.5rem"
  },
  divider: {
    margin: "2rem"
  }
});

const DashboardDefault = ({ user, match, history }) => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <PollsContainer classes={classes} user={user} />
        <Divider className={classes.divider} />
        <FriendListContainer classes={classes} user={user} />
      </Container>
    </>
  );
};

export default withRouter(DashboardDefault);
