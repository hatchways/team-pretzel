import React from "react";
import FriendList from "./FriendList";
import { Container, makeStyles } from "@material-ui/core";
import socket from "../../utils/socket";

const useStyles = makeStyles({
  flexContainer: {
    display: "flex",
    minHeight: "100vh"
  },
  friendsBar: { width: "25%", borderRight: "0.5px solid lightgrey" }
});

const ContentContainer = ({ children, user }) => {
  const classes = useStyles();
  socket.on("user_online", onlineUser => {
    console.log(onlineUser);
  });
  return (
    <div className={classes.flexContainer}>
      <div className={classes.friendsBar}>
        <Container>
          {user.friends.length < 1 ? (
            <h6>get some friends</h6>
          ) : (
            <FriendList friends={user.friends[0].friends} />
          )}
        </Container>
      </div>
      <div style={{ width: "75%" }}>{children}</div>
    </div>
  );
};

export default ContentContainer;
