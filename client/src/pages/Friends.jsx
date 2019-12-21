import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Tabs,
  Tab,
  TextField,
  CircularProgress
} from "@material-ui/core";
import FriendsTabPanel from "../components/Friends/FriendsTabPanel";
import SuggestedTabPanel from "../components/Friends/SuggestedTabPanel";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    minWidth: "80%",
    maxWidth: "80%",
    textAlign: "center",
    margin: "1rem auto",
    paddingTop: theme.spacing(6)
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

const Friends = ({ friends, potentialFriends, handleAddorRemoveFriend }) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const [inputValue, setInputValue] = useState("");
  const handleOnChange = event => {
    setInputValue(event.target.value);
  };

  return !friends || !potentialFriends ? (
    <CircularProgress />
  ) : (
    <div className={classes.root}>
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
          friends={friends}
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
