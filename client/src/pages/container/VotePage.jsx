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

  // let numberOfVotes = 0;
  // let listOfVoters = [];
  // if (poll) {
  //   // Add up the total number of votes
  //   poll.images.forEach(image => (numberOfVotes += image.castBy.length));
  //   // Populate list of voters
  //   poll.images.forEach(image =>
  //     image.castBy.length < 1
  //       ? listOfVoters
  //       : (listOfVoters = [image.castBy, ...listOfVoters])
  //   );
  // }

  return !poll ? (
    <CircularProgress />
  ) : (
    <div className={classes.root}>
      <Typography variant="h1">{poll.question}</Typography>
      {/* <Typography variant="h4">{numberOfVotes} answers</Typography>*/}
      <div className={classes.imageContainer}>
        {poll.images.map(image => (
          <PollImage image={image} key={image._id} />
        ))}
      </div>
      {/* <List>
        {listOfVoters.length < 1 ? (
          <h1>Nobody has voted yet</h1>
        ) : (
          // List the voters
          <h1>somebody voted</h1>
        )}
      </List> */}
    </div>
  );
};

export default withRouter(VotePage);

//friends who voted
