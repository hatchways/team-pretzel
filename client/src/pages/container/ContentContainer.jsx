import React from "react";
import FriendList from "./FriendList";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  flexContainer: {
    display: "flex",
    minHeight: "100vh"
  },
  friendsBar: { width: "25%", borderRight: "0.5px solid lightgrey" }
});

const ContentContainer = ({ children, user }) => {
  const classes = useStyles();
  console.log(user);
  return (
    <div className={classes.flexContainer}>
      <div className={classes.friendsBar}>
        <Container>
          <FriendList id={user._id} />
        </Container>
      </div>
      <div style={{ width: "75%" }}>{children}</div>
    </div>
  );
};

export default ContentContainer;
