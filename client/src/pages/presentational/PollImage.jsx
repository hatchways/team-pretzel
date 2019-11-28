import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import socket from "../../utils/socket";

const useStyles = makeStyles({
  image: {
    width: "200px",
    height: "200px"
  }
});

const PollImage = ({ image, handleVoteClick, userId, isUser }) => {
  const votes = image.castBy.length;

  const [voted, setVoted] = useState(false);

  useEffect(() => {
    hasVoted(userId, image);
  });

  const hasVoted = (user, image) => {
    image.castBy.forEach(voter => {
      if (voter.user._id === user) {
        setVoted(true);
      }
    });
  };

  const classes = useStyles();

  return (
    <div style={{ marginRight: "0.5rem" }}>
      <img
        className={classes.image}
        src={image.url}
        alt="random"
        onClick={() => {
          if (!isUser || !voted) {
            handleVoteClick(image._id);
          }
        }}
      />
      <div style={{ marginLeft: "40%" }}>
        <Favorite color="secondary" />
        {votes}
      </div>
    </div>
  );
};

export default PollImage;
