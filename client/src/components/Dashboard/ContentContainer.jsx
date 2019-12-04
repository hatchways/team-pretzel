import React, { useEffect } from "react";
import FriendList from "../FriendList/FriendList";
import { Container, makeStyles } from "@material-ui/core";
import socket from "../../utils/socket";

const useStyles = makeStyles({
  flexContainer: {
    display: "flex",
    minHeight: "100vh"
  },
  friendsBar: { width: "25%", borderRight: "0.5px solid lightgrey" }
});

const ContentContainer = ({ children, friends, setFriends }) => {
  const classes = useStyles();

  useEffect(() => {
    socket.on("user_online", onlineUser => {
      const updateFriends = friends.map(friend => {
        if (friend.id === onlineUser.id) {
          friend.online = onlineUser.online;
        }
        return friend;
      });
      setFriends(updateFriends);
    });

    socket.on("user_offline", offlineUser => {
      const updateFriends = friends.map(friend => {
        if (friend.id === offlineUser.id) {
          friend.online = offlineUser.online;
        }
        return friend;
      });
      setFriends(updateFriends);
    });
  }, [friends, setFriends]);

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
