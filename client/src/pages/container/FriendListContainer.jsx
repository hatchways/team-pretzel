import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, GridList } from "@material-ui/core";
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

  const addFriendList = async friendListObj => {
    await axios.post("/api/v1/friend-lists", friendListObj);
    setLoading(true);
  };

  const deleteFriendList = async id => {
    await axios.delete(`/api/v1/friend-lists/${id}`);
    setLoading(true);
  };

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h5">Friend Lists</Typography>
        <FriendListDialog addFriendList={addFriendList} user={user} />
      </div>
      <GridList className={classes.gridList}>
        {loading ? (
          <CircularProgress />
        ) : !friendList.length ? (
          <Typography variant="h6">
            You haven't created a friend list yet
          </Typography>
        ) : (
          friendList.map(list => (
            <FriendListCard
              key={list._id}
              friends={list.friends}
              title={list.title}
              id={list._id}
              isUser={user._id === list.user ? true : false}
              deleteFriendList={
                user._id === list.user ? deleteFriendList : null
              }
            />
          ))
        )}
      </GridList>
    </>
  );
};

export default FriendListContainer;
