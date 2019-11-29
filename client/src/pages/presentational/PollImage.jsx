import React from "react";
import { CardMedia, makeStyles } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import socket from "../../utils/socket";

const useStyles = makeStyles({
  image: {
    width: "200px",
    height: "200px"
  }
});

const PollImage = ({ image, handleVoteClick }) => {
  const votes = image.castBy.length;

  const classes = useStyles();

  return (
    <div style={{ marginRight: "0.5rem" }}>
      <CardMedia
        component="img"
        className={classes.image}
        image={image.url}
        title="Poll option"
        onClick={() => {
          handleVoteClick(image._id);
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
