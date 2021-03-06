import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, Typography, ListItem } from "@material-ui/core";
import Friend from "../Friends/Friend";

const useStyles = makeStyles(theme => ({
  title: { textAlign: "center", paddingTop: "10px" }
}));

const FriendList = ({ friends }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" className={classes.title}>
        Friends
      </Typography>
      {friends ? (
        <List>
          {friends.map(friend => (
            <ListItem key={friend._id}>
              <Friend friend={friend} />
            </ListItem>
          ))}
        </List>
      ) : null}
    </>
  );
};

export default FriendList;
