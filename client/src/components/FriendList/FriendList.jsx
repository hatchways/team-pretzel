import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, Typography } from "@material-ui/core";
import Friend from "../Friends/Friend";

const useStyles = makeStyles(theme => ({
  // root: { position: "absolute", top: "5rem" },
  title: { padding: "10%" }
}));

const FriendList = ({ friends }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.title}>
        Friends
      </Typography>
      {friends ? (
        <List>
          <Friend friends={friends} />{" "}
        </List>
      ) : null}
    </React.Fragment>
  );
};

export default FriendList;
