import React from "react";
import { withRouter } from "react-router";
import {
  CircularProgress,
  List,
  Typography,
  makeStyles
} from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import useGet from "../../utils/hooks/useGet";
import VoterList from "../presentational/VoterList";
// import socket from "../../utils/socket";

import PollImage from "../presentational/PollImage";

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

  let numberOfVotes = 0;
  let listOfVoters = [];
  if (poll) {
    // Add up the total number of votes
    poll.images.forEach(image => (numberOfVotes += image.castBy.length));
    // Populate list of voters
    poll.images.forEach(image =>
      image.castBy.length < 1
        ? listOfVoters
        : (listOfVoters = [
            { voters: image.castBy, url: image.url },
            ...listOfVoters
          ])
    );
  }
  console.log(listOfVoters);

  return !poll || !listOfVoters ? (
    <CircularProgress />
  ) : (
    <div className={classes.root}>
      <Typography variant="h3">{poll.question}</Typography>
      <Typography variant="subtitle1">{numberOfVotes} answers</Typography>
      <div className={classes.imageContainer}>
        {poll.images.map(image => (
          <PollImage image={image} key={image._id} />
        ))}
      </div>
      {!listOfVoters ? (
        <>no vote</>
      ) : (
        <List>
          <VoterList listOfVoters={listOfVoters} />
        </List>
      )}
    </div>
  );
};

export default withRouter(VotePage);

//friends who voted
