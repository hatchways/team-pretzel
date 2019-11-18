import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";
import FriendListCard from "../presentational/FriendListCard";
import FriendListDialog from "../presentational/FriendListDialog";
import PollDialog from "../presentational/PollDialog";
import PollCard from "../presentational/PollCard";

const useStyles = makeStyles({
  container: {
    margin: "1rem 0"
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
  }
});

const DashboardDefault = props => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.container}>
        <div className={classes.header}>
          <Typography>Friend Lists</Typography>
          <FriendListDialog />
        </div>
        <div className={classes.cardContainer}>
          <FriendListCard />
          <FriendListCard />
          <FriendListCard />
          <FriendListCard />
          <FriendListCard />
        </div>

        <div className={classes.header}>
          <Typography>Polls</Typography>
          <PollDialog />
        </div>
        <div className={classes.cardContainer}>
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
        </div>
      </Container>
    </>
  );
};

export default DashboardDefault;
