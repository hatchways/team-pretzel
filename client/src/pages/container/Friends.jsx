import React, { useState, useEffect } from "react";
import { makeStyles, Paper, Tabs, Tab, Typography } from "@material-ui/core";
import FriendsTabPanel from "../presentational/FriendsTabPanel";
import SuggestedTabPanel from "../presentational/SuggestedTabPanel";
import useGet from "../../utils/hooks/useGet";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    height: "100%",
    minWidth: "80%",
    maxWidth: "80%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "1rem auto"
  }
});

const Friends = ({ location }) => {
  const { user } = location.state;
  const classes = useStyles();

  // get friends
  const friends = useGet(`/api/v1/friends/${user.id}`, "friends");

  // get suggested friends
  const potentialFriends = useGet(
    `/api/v1/friends/suggested-friends/${user.id}`,
    "potentialFriends"
  );

  const [value, setValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddFriend = async friendId => {
    const result = await axios.put(
      `/api/v1/friends/${user.id}/add-friend/${friendId}`
    );
  };

  return (
    <div className={classes.root}>
      <Typography>Friends</Typography>
      <Paper>
        <div>
          <Tabs
            centered
            variant="fullWidth"
            value={value}
            onChange={handleChangeTab}
          >
            <Tab label="Following" />
            <Tab label="Suggested" />
          </Tabs>
        </div>
        <FriendsTabPanel friends={friends} value={value} index={0} />
        <SuggestedTabPanel
          handleAddFriend={handleAddFriend}
          potentialFriends={potentialFriends}
          value={value}
          index={1}
        />
      </Paper>
    </div>
  );
};

export default Friends;
