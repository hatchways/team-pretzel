import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, Typography } from "@material-ui/core";
import Friends from "../Friends";

const useStyles = makeStyles(theme => ({
  //title: { flexGrow: 1 }
}));

const FriendList = ({ friends }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.title}>
        Friends
      </Typography>
      <List>
        <Friends friends={friends} />
      </List>
    </>
  );
};

export default FriendList;
