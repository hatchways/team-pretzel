import React, { useState } from "react";
import { Container, Typography, Divider, makeStyles } from "@material-ui/core";
import FriendListCard from "../presentational/FriendListCard";
import FriendListDialog from "../presentational/FriendListDialog";
import PollDialog from "../presentational/PollDialog";
import PollCard from "../presentational/PollCard";
import useGet from "../../utils/hooks/useGet";
import axios from "axios";

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
  const classes = useStyles();

  const [polls, setPolls] = useState(user.polls);
  console.log(polls);

  // const updatePolls = async () => {
  //   const newPolls = await axios.get(`/api/v1/polls/user-polls/${user._id}`);
  //   console.log(newPolls.data.polls);
  //   setPolls(newPolls.data.polls);
  // };

  return (
    <>
      <Container className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h5">Friend Lists</Typography>
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
          <Typography variant="h5">Polls ({polls.length})</Typography>
          <PollDialog
            user={user}
            polls={polls} /* updatePolls={updatePolls} */
          />
        </div>
        <div className={classes.cardContainer}>
          {!polls ? (
            <h1>No polls...</h1>
          ) : (
            polls.map(poll => (
              <PollCard
                key={poll._id}
                question={poll.question}
                images={poll.images}
                pollId={poll._id}
              />
            ))
          )}
        </div>
      </Container>
    </>
  );
};

export default DashboardDefault;
