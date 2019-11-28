import React, { useState, useEffect } from "react";
import FriendList from "./FriendList";
import { Container, makeStyles } from "@material-ui/core";
import socket from "../../utils/socket";
import axios from "axios";

const useStyles = makeStyles({
  flexContainer: {
    display: "flex",
    minHeight: "100vh"
  },
  friendsBar: { width: "25%", borderRight: "0.5px solid lightgrey" }
});

const ContentContainer = ({ children }) => {
  const classes = useStyles();
  socket.on("user_online", onlineUser => {
    console.log(onlineUser);
  });
  const [friends, setFriends] = useState([]);
  const getFriends = async () => {
    const token = localStorage.getItem("jwtToken");
    const res = await axios.get("/api/v1/friends", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setFriends(res.data.friends);
  };

  useEffect(() => {
    getFriends();
  }, []);
  return (
    <div className={classes.flexContainer}>
      <div className={classes.friendsBar}>
        <Container>
          {friends.length < 1 ? (
            <h6>get some friends</h6>
          ) : (
            <FriendList friends={friends} />
          )}
        </Container>
      </div>
      <div style={{ width: "75%" }}>{children}</div>
    </div>
  );
};

export default ContentContainer;
