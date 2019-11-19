import React, { useState } from "react";
import { makeStyles, Paper, Tabs, Tab, Typography } from "@material-ui/core";
import FriendsTabPanel from "../presentational/FriendsTabPanel";

const useStyles = makeStyles({
  root: {
    width: "80%"
  }
});

const Friends = params => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
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
        <FriendsTabPanel value={value} index={0} />
        <FriendsTabPanel value={value} index={1} />
      </Paper>
    </div>
  );
};

export default Friends;
