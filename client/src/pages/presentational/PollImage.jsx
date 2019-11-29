import React from "react";
import { CardMedia, Card, makeStyles } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import socket from "../../utils/socket";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  card: {
    marginRight: "2rem"
  },
  image: {
    width: "200px",
    height: "200px",
    cursor: "pointer"
  },
  votes: {
    display: "flex",
    alignItems: "center",
    marginTop: "1rem"
  }
});

const PollImage = ({ image, handleVoteClick }) => {
  const votes = image.castBy.length;

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          className={classes.image}
          image={image.url}
          title="Click to vote"
          onClick={() => {
            handleVoteClick(image._id);
          }}
        />
      </Card>
      <div className={classes.votes}>
        <Favorite color="secondary" />
        {votes}
      </div>
    </div>
  );
};

export default PollImage;
