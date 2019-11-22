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

  const handleDialog = () => {
    setOpen(!open);
  };

  let match = useRouteMatch("/dashboard");

  return (
    <div className={classes.root}>
      {user ? (
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
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
              {user.online ? <span>Me online</span> : null}

              {user.name}
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
                        <ProfileDialog
                          open={open}
                          onClick={handleClose}
                          handleDialog={handleDialog}
                          user={user}
                        />
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
