import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import PollCard from "../components/Poll/PollCard";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "1rem"
  }
}));

const FriendsPolls = () => {
  const classes = useStyles();
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const getPolls = async () => {
      const response = await axios.get("/api/v1/users/profile/polls");
      setPolls(response.data.taggedPolls);
    };
    getPolls();
  }, []);

  return !polls ? (
    <CircularProgress />
  ) : !polls.length ? (
    <Typography variant="h6">
      Your friends haven't created any polls yet
    </Typography>
  ) : (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {polls.map(poll => (
          <Grid key={poll._id} item xs>
            <PollCard
              question={poll.question}
              images={poll.images}
              pollId={poll._id}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FriendsPolls;
