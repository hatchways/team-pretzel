import React from "react";
import { Container, Typography, Divider, makeStyles } from "@material-ui/core";
import FriendListCard from "../presentational/FriendListCard";
import FriendListDialog from "../presentational/FriendListDialog";
import PollDialog from "../presentational/PollDialog";
import PollCard from "../presentational/PollCard";

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

const DashboardDefault = ({ user }) => {
  console.log(user);
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
        <Divider className={classes.divider} />
        <div className={classes.header}>
          <Typography>Polls</Typography>
          <PollDialog />
        </div>
        <div className={classes.cardContainer}>
          {!user.polls ? (
            <h1>none</h1>
          ) : (
            user.polls.map(poll => (
              <PollCard
                key={poll._id}
                question={poll.question}
                imageIds={poll.images}
              />
            ))
          )}
        </div>
      </Container>
      {/*<Divider />
       <Container style={{ marginTop: "1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography>Polls</Typography>
          <PollDialog />
        </div>
        <PollCard user={props.user} />
      </Container> */}
    </>
  );
};

export default DashboardDefault;
