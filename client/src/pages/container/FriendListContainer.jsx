import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import FriendListDialog from "../presentational/FriendListDialog";
import FriendListCard from "../presentational/FriendListCard";

const FriendListContainer = ({ classes, user }) => {
  useEffect(() => {});

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h5">Friend Lists</Typography>
        <FriendListDialog />
      </div>
      <div className={classes.cardContainer}>
        <FriendListCard />
      </div>
    </>
  );
};

export default FriendListContainer;
