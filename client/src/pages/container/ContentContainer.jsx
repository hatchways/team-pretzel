import React from "react";
import FriendList from "./FriendList";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  flexContainer: {
    display: "flex",
    height: "100vh"
  },
  friendsBar: { width: "25%", borderRight: "0.5px solid lightgrey" }
});

const ContentContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.flexContainer}>
      <div className={classes.friendsBar}>
        <Container>
          <FriendList />
        </Container>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ContentContainer;
