import React from "react";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  List,
  Typography,
  makeStyles
} from "@material-ui/core";
import { KeyboardArrowLeft, Favorite } from "@material-ui/icons";
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
    width: "200px",
    height: "200px"
  },
  imageContainer: {
    display: "flex"
  }
}));

const VotePage = ({ location }) => {
  const classes = useStyles();
  //remove and replace with props when done
  const tempId = "5dd4e1ecd5c96a79b71f029e";
  //replace tempId with pollId when done
  const poll = useGet(`/api/v1/polls/${location.state.pollId}`, "poll");

  console.log(location);

  let numberOfVotes = 0;
  if (poll) {
    console.log(poll.images);
    // Add up the total number of votes
    poll.images.forEach(image => (numberOfVotes += image.castBy.length));
  }

  return !poll ? (
    <CircularProgress />
  ) : (
    <div className={classes.root}>
      <Typography>
        <Link to="/dashboard">
          <KeyboardArrowLeft />
          Back
        </Link>
      </Typography>
      <Typography variant="h1">{poll.question}</Typography>
      <Typography variant="h4">{numberOfVotes} answers</Typography>
      <div className={classes.imageContainer}>
        {poll.images.map(image => (
          <div key={image._id} style={{ marginRight: "0.5rem" }}>
            <img className={classes.images} src={image.url} alt="random" />
            <Favorite color="secondary" />
            {image.castBy.length}
          </div>
        ))}
      </div>
      <List>
        novote
        {/* {poll.image.map(image => {
          <Friend />;
        })} */}
      </List>
    </div>
  );
};

export default VotePage;

//friends who voted
