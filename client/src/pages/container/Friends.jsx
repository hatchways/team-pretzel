import React, { useState } from "react";
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
    margin: "1rem auto"
  }
});

const Friends = ({ location }) => {
  const { user } = location.state;
  const classes = useStyles();

  // get suggested friends
  const potentialFriends = useGet(
    `/api/v1/friends/suggest`,
    "potentialFriends"
  );

  const [value, setValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddFriend = async friendId => {
    await axios.put(`/api/v1/friends/${friendId}`);
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
        <FriendsTabPanel friends={user.friends} value={value} index={0} />
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
