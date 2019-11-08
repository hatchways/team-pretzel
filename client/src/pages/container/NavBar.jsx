import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
  Avatar
} from "@material-ui/core";
import userAvatar from "../../assets/userAvatar.png";
import ProfileDialog from "../presentational/ProfileDialog";

const useStyles = makeStyles({
  avatar: {
    margin: 10
  }
});

const NavBar = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper>
      <Tabs value={0} centered>
        <Tab label="Friends" />
        <Tab label="Friends polls" />
        <Tab label="Opinions" />
        <Tab label="Create poll" />
        <Avatar alt="Test User" src={userAvatar} className={classes.avatar} />
        <Button onClick={handleClick}>My Profile</Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Go to profile</MenuItem>
          <MenuItem onClick={handleClose}>
            <ProfileDialog />
          </MenuItem>
          <MenuItem onClick={handleClose}>Log out</MenuItem>
        </Menu>
      </Tabs>
    </Paper>
  );
};

export default NavBar;
