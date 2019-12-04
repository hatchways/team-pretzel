import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
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
  MenuList,
  Typography,
  ClickAwayListener
} from "@material-ui/core";
import OnlineBadge from "../Friends/OnlineBadge";
import ProfileDialog from "../Dashboard/ProfileDialog";
import logo from "../../assets/logo.jpg";
import socket from "../../utils/socket";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white",
    position: "relative"
  },
  logo: {
    height: "4rem",
    width: "4rem",
    marginLeft: "5rem",
    position: "absolute"
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
  name: {
    marginLeft: "0.5rem"
  }
}));

const NavBar = ({ user, handleLogOut, match }) => {
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

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <NavLink exact to="/dashboard">
          <img src={logo} alt="logo" className={classes.logo} />
        </NavLink>
        <Toolbar className={classes.toolbar}>
          <NavLink exact to="/friends" className={classes.menuButton}>
            <Button>Friends</Button>
          </NavLink>

          <NavLink exact to="/friends-polls" className={classes.menuButton}>
            <Button>Friends poll</Button>
          </NavLink>

          <ProfileDialog user={user} className={classes.menuButton} />

          <Button
            className={classes.name}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <OnlineBadge overlap="circle" variant="dot">
              <Avatar alt={user.name} src={user.avatar} />
            </OnlineBadge>
            <Typography className={classes.name}>{user.name}</Typography>
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
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="menu-list-grow">
                      <MenuItem
                        onClick={() => {
                          handleLogOut();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavBar);
