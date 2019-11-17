import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { List, Typography } from "@material-ui/core";
import Friend from "../presentational/Friend";

const useStyles = makeStyles(theme => ({
  // root: { position: "absolute", top: "5rem" },
  title: { padding: "10%" }
}));

const FriendList = () => {
  const classes = useStyles();

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    getFriends();
  }, []);

  const getFriends = async () => {
    const response = await axios.get("/api/v1/users");
    setFriends(response.data.data.users);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Friends
      </Typography>
      <List>
        <Friend friends={friends} />
      </List>
    </div>
  );
};

export default FriendList;
