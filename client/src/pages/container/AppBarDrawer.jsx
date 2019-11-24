import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  AppBar,
  Toolbar,
  Avatar,
  Paper,
  Popper,
  Grow,
  MenuItem,
  MenuList
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import ProfileDialog from "../presentational/ProfileDialog";
import PollDialog from "../presentational/PollDialog";

import socket from "../../utils/socket";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    textDecoration: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: {
    marginLeft: "auto",
    marginRight: "5rem",
    ...theme.mixins.toolbar
  },
  avatar: { margin: 10 }
}));

const AppBarDrawer = ({ user, handleLogOut }) => {
  socket.emit("user_online", user);
  socket.on("user_online", () => {});
  console.log("From AppBar", user);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  let match = useRouteMatch("/dashboard");

  return (
    <div className={classes.root}>
      {user ? (
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Link
              to={{
                pathname: `${match.path}/`
              }}
              className={classes.menuButton}
            >
              <Button>Home</Button>
            </Link>
            <Link
              to={{
                pathname: `${match.path}/friends`,
                state: { user }
              }}
              className={classes.menuButton}
            >
              <Button>Friends</Button>
            </Link>

            <Link to="#" className={classes.menuButton}>
              <Button>Friends poll</Button>
            </Link>

            <Link to="#" className={classes.menuButton}>
              <Button>Opinions</Button>
            </Link>

            <PollDialog user={user} />

            <Button
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Avatar
                alt={user.name}
                src={user.avatar}
                className={classes.avatar}
              />
              {user.name}
              {/*This icon below is temporarily used for testing user online status*/}
              {user.online ? (
                <FiberManualRecordIcon style={{ color: "#1EA362" }} />
              ) : (
                <FiberManualRecordIcon color="disabled" />
              )}
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <MenuList id="menu-list-grow">
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem>
                        <ProfileDialog onClick={handleClose} user={user} />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleLogOut();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Toolbar>
        </AppBar>
      ) : null}
    </div>
  );
};

export default AppBarDrawer;
