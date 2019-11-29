import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { CircularProgress, Typography, makeStyles } from "@material-ui/core";
import PollImage from "../presentational/PollImage";
import VoteListContainer from "./VoteListContainer";
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
  const [voters, setVoters] = useState([]);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    getPoll(pollId);
    votes(pollId);
    checkIsUser(poll, user);
    hasVoted(user, voters);
  }, [loading, pollId]);

  const getPoll = async id => {
    const response = await axios.get(`/api/v1/polls/${id}`);
    setPoll(response.data.poll);
    setImages(response.data.poll.images);
    setLoading(false);
  };

  const handleVoteClick = async imageId => {
    if (!isUser) {
      if (!voted) {
        await axios.post(`/api/v1/vote/${imageId}`, {
          poll: pollId,
          timestamp: Date.now()
        });
        setLoading(true);
      }
    }
  };

  const checkIsUser = (poll, user) => {
    if (poll.createdBy === user._id) {
      setIsUser(true);
    }
  };

  const votes = async pollId => {
    const response = await axios.get(`/api/v1/vote/votes/${pollId}`);
    setVoters(response.data.votes);
  };

  const hasVoted = (user, voters) => {
    voters.forEach(voter => voter.user._id === user._id && setVoted(true));
  };

  const classes = useStyles();

  return loading ? (
    <CircularProgress />
  ) : (
    <div className={classes.root}>
      <Typography variant="h3">{poll.question}</Typography>
      <Typography variant="subtitle2">{voters.length} answers</Typography>
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
      <VoteListContainer pollId={pollId} />
    </div>
  );
};

export default withRouter(VotePage);
