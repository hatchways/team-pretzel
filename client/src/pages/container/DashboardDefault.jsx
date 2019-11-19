import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";
import FriendListCard from "../presentational/FriendListCard";
import FriendListDialog from "../presentational/FriendListDialog";
import PollDialog from "../presentational/PollDialog";
import PollCard from "../presentational/PollCard";
import useGet from "../../utils/hooks/useGet";

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
  const taggedPolls = useGet(
    "/api/v1/users/profile/getTaggedPolls",
    "taggedPolls"
  );
  console.log(taggedPolls);

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
          {taggedPolls === null ? (
            <div>...Loading...</div>
          ) : (
            taggedPolls.map(poll => {
              return <PollCard key={poll._id} poll={poll} />;
            })
          )}
        </div>
      </Container>
    </>
  );
};

export default DashboardDefault;
