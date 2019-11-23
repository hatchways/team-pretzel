import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import axios from "axios";
import socket from "../../utils/socket";

const useStyles = makeStyles({
  image: {
    width: "200px",
    height: "200px"
  }
});

const PollImage = ({ image }) => {
  const [votes, setVotes] = useState(image.castBy.length);

  useEffect(() => {
    socket.emit("current_votes", image._id);
    socket.on("current_votes", votes => setVotes(votes));
  }, [image._id]);

  const classes = useStyles();

  return (
    <div style={{ marginRight: "0.5rem" }}>
      <img className={classes.image} src={image.url} alt="random" />
      <Favorite
        color="secondary"
        onClick={async () => {
          await axios.post(`/api/v1/images/${image._id}`);
          socket.emit("current_votes", image._id);
        }}
      />
      {votes}
    </div>
  );
};

export default PollImage;
