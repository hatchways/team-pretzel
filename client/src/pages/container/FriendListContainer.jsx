import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import FriendListDialog from "../presentational/FriendListDialog";
import FriendListCard from "../presentational/FriendListCard";
import axios from "axios";

const FriendListContainer = ({ classes, user }) => {
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFriendList(user._id);
  }, [loading, user._id]);

  const getFriendList = async id => {
    const response = await axios.get(`/api/v1/friend-lists/${id}`);
    setFriendList(response.data.friendLists);
    setLoading(false);
  };

  const addFriendList = async (title, friendsToAdd) => {
    await axios.post("/api/v1/friend-lists", { title, friendsToAdd });
    setLoading(true);
  };

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h5">Friend Lists</Typography>
        <FriendListDialog addFriendList={addFriendList} />
      </div>
      <div className={classes.cardContainer}>
        {loading ? (
          <></>
        ) : !friendList ? (
          <h1>No friend list</h1>
        ) : (
          friendList.map(list => (
            <FriendListCard
              key={list._id}
              friends={list.friends}
              title={list.title}
            />
          ))
        )}
      </div>
    </>
  );
};

export default FriendListContainer;
