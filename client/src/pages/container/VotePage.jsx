import React from "react";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  List,
  Typography,
  makeStyles
} from "@material-ui/core";
import { KeyboardArrowLeft, Favorite } from "@material-ui/icons";
import Friend from "../presentational/Friend";
import useGet from "../../utils/hooks/useGet";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
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

const VotePage = ({ pollId }) => {
  const classes = useStyles();
  //remove and replace with props when done
  const tempId = "5dd4e1ecd5c96a79b71f029e";
  //replace tempId with pollId when done
  const poll = useGet(`/api/v1/polls/${tempId}`, "poll");

  let numberOfVotes = 0;
  if (poll) {
    console.log(poll.images);
    // Add up the total number of votes
    poll.images.forEach(image => (numberOfVotes += image.castBy.length));
  }

  return !poll ? (
    <CircularProgress />
  ) : (
    <>
      <Typography>
        <Link to="/dashboard">
          <KeyboardArrowLeft />
          Back
        </Link>
      </Typography>
      <Typography variant="h1">{poll.question}</Typography>
      <h4>{numberOfVotes} answers</h4>
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
    </>
  );
};

export default VotePage;

//friends who voted
