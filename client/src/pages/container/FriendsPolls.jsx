import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid } from "@material-ui/core";
import PollCard from "../presentational/PollCard";

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

  console.log(polls);
  return !polls ? (
    <CircularProgress />
  ) : (
    <div className={classes.root}>
      <Grid container spacing={3} justify="space-around">
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
