import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { CircularProgress, Typography, makeStyles } from "@material-ui/core";
import PollImage from "../presentational/PollImage";
import VoteList from "../presentational/VoteList";
import axios from "axios";

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

const VotePage = ({ match, location, user }) => {
  const {
    params: { pollId }
  } = match;

  const [poll, setPoll] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    getPoll(pollId);

    checkIsUser(poll, user);
  }, [loading, pollId]);

  const getPoll = async id => {
    const response = await axios.get(`/api/v1/polls/${id}`);
    setPoll(response.data.poll);
    setImages(response.data.poll.images);
    setLoading(false);
  };

  const handleVoteClick = async imageId => {
    await axios.post(`/api/v1/vote/${imageId}`);
    setLoading(true);
  };

  const checkIsUser = (poll, user) => {
    if (poll.createdBy === user._id) {
      setIsUser(true);
    }
  };

  const classes = useStyles();

  return loading ? (
    <CircularProgress />
  ) : (
    <div className={classes.root}>
      <Typography variant="h3">{poll.question}</Typography>
      {/* <Typography variant="subtitle1">{numberOfVotes} answers</Typography> */}
      <div className={classes.imageContainer}>
        {images.map(image => (
          <PollImage
            image={image}
            key={image._id}
            handleVoteClick={handleVoteClick}
            userId={user._id}
            isUser={isUser}
          />
        ))}
      </div>
      <VoteList images={images} />
    </div>
  );
};

export default withRouter(VotePage);
