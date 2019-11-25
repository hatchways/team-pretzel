import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Tabs,
  Tab,
  Typography,
  TextField,
  CircularProgress
} from "@material-ui/core";
import FriendsTabPanel from "../presentational/FriendsTabPanel";
import SuggestedTabPanel from "../presentational/SuggestedTabPanel";
import useGet from "../../utils/hooks/useGet";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    minWidth: "80%",
    maxWidth: "80%",
    textAlign: "center",
    margin: "1rem auto"
  },
  textField: {
    width: "75%",
    "& label.Mui-focused": {
      color: theme.primary
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.primary
    }
  }
}));

const Friends = ({ user }) => {
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

  const handleAddorRemoveFriend = async friendId => {
    await axios.put(`/api/v1/friends/${friendId}`);
  };

  const [inputValue, setInputValue] = useState("");
  const handleOnChange = event => {
    setInputValue(event.target.value);
  };

  return !user && !potentialFriends ? (
    <CircularProgress />
  ) : (
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
        <TextField
          value={inputValue}
          label="type name"
          onChange={handleOnChange}
          className={classes.textField}
        />
        <FriendsTabPanel
          handleAddorRemoveFriend={handleAddorRemoveFriend}
          friends={user.friends}
          value={value}
          index={0}
          inputValue={inputValue}
        />
        <SuggestedTabPanel
          handleAddorRemoveFriend={handleAddorRemoveFriend}
          potentialFriends={potentialFriends}
          value={value}
          index={1}
          inputValue={inputValue}
        />
      </Paper>
    </div>
  );
};

export default Friends;
