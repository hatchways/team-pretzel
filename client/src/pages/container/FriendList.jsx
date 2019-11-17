import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, Typography } from "@material-ui/core";

import useGet from "../../utils/hooks/useGet";
import Friend from "../presentational/Friend";

const useStyles = makeStyles(theme => ({
  // root: { position: "absolute", top: "5rem" },
  title: { padding: "10%" }
}));

const FriendList = () => {
  const friends = useGet("/api/v1/users", "users");

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
