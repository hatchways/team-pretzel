import React from "react";

import { withRouter } from "react-router";
import { Container, Typography, Divider, makeStyles } from "@material-ui/core";
import FriendListCard from "../presentational/FriendListCard";
import FriendListDialog from "../presentational/FriendListDialog";
import PollsContainer from "./PollsContainer";
import FriendListContainer from "./FriendListContainer";

const useStyles = makeStyles({
  container: {
    margin: "1rem "
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardContainer: {
    display: "flex",
    overflowX: "scroll",
    padding: "0.5rem 0.5rem"
  },
  divider: {
    margin: "1rem"
  }
});

const DashboardDefault = ({ user, match, history }) => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.container}>
        <PollsContainer classes={classes} user={user} />
        <Divider className={classes.divider} />
        <FriendListContainer classes={classes} user={user} />
      </Container>
    </>
  );
};

export default withRouter(DashboardDefault);
