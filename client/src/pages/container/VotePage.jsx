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
  images: {
    width: "150px",
    height: "150px"
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
        : (listOfVoters = [image.castBy, ...listOfVoters])
    );
  }

  return !poll ? (
    <CircularProgress />
  ) : (
    <div className={classes.root}>
      <Typography variant="h3">{poll.question}</Typography>
      <Typography variant="subtitle1">{numberOfVotes} answers</Typography>
      <div className={classes.imageContainer}>
        {poll.images.map(image => (
          <div key={image._id} style={{ marginRight: "0.5rem" }}>
            <img className={classes.images} src={image.url} alt="random" />
            <div style={{ marginLeft: "40%" }}>
              <Typography variant="subtitle2" style={{ fontSize: "1.5rem" }}>
                <Favorite color="secondary" />
                {image.castBy.length}
              </Typography>
            </div>
          </div>
        ))}
      </div>
      <List>
        {listOfVoters.length < 1 ? (
          <h1>Nobody has voted yet</h1>
        ) : (
          // List the voters
          <h1>somebody voted</h1>
        )}
      </List>
    </div>
  );
};

export default withRouter(VotePage);

//friends who voted
