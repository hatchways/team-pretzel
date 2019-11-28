import React, { useState } from "react";
import { withRouter } from "react-router";
import {
  CircularProgress,
  List,
  Typography,
  makeStyles
} from "@material-ui/core";
import useGet from "../../utils/hooks/useGet";
import PollImage from "../presentational/PollImage";
import VoteList from "../presentational/VoteList";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    minWidth: "80%",
    maxWidth: "80%",

    margin: "1rem auto"
  },
  inline: {
    display: "inline"
  },
  imageContainer: {
    display: "flex"
  }
}));

const VotePage = ({ match, location }) => {
  const {
    params: { pollId }
  } = match;

  const poll = useGet(`/api/v1/polls/${pollId}`, "poll");

  const classes = useStyles();

  return !poll ? (
    <CircularProgress />
  ) : (
    <div className={classes.root}>
      <Typography variant="h3">{poll.question}</Typography>
      {/* <Typography variant="subtitle1">{numberOfVotes} answers</Typography> */}
      <div className={classes.imageContainer}>
        {poll.images.map(image => (
          <PollImage image={image} key={image._id} />
        ))}
      </div>
      <VoteList images={poll.images} />
    </div>
  );
};

export default withRouter(VotePage);
