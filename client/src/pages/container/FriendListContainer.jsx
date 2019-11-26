import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import FriendListDialog from "../presentational/FriendListDialog";
import FriendListCard from "../presentational/FriendListCard";
import axios from "axios";

const FriendListContainer = ({ classes, user }) => {
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {});

  const getFriendList = () => {};

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
