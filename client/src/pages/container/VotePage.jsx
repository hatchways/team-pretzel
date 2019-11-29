import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import {
  CircularProgress,
  Typography,
  Container,
  makeStyles
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PollImage from "../presentational/PollImage";
import VoteListContainer from "./VoteListContainer";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    minWidth: "80%",
    display: "flex",
    flexDirection: "column"
  },
  container: {
    margin: "3rem 0"
  },
  arrowBack: {
    marginBottom: "2rem"
  },
  imageContainer: {
    display: "flex",
    margin: "3rem 0"
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
      <Container className={classes.container}>
        <Link to="/dashboard">
          <ArrowBackIcon
            fontSize="large"
            color="secondary"
            className={classes.arrowBack}
          />
        </Link>

        <Typography variant="h4">{poll.question}</Typography>
        <Typography variant="subtitle2">
          {voters.length === 1
            ? `${voters.length} answer`
            : `${voters.length} answers`}
        </Typography>
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
      </Container>
    </div>
  );
};

export default withRouter(VotePage);
