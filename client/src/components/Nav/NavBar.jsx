import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router";
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
  ClickAwayListener,
  IconButton
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import OnlineBadge from "../Friends/OnlineBadge";
import ToolbarLinks from "./ToolbarLinks";

const NavBar = ({ classes, user, handleLogOut, match, handleDrawerToggle }) => {
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

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <div style={{ display: "flex" }}>
        <IconButton
          color="inherit"
          edge="start"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          className={classes.drawerButton}
        >
          <Menu />
        </IconButton>

        <Toolbar className={classes.toolbar}>
          <ToolbarLinks
            menuButtonClass={classes.menuButton}
            logoClass={classes.logo}
            user={user}
          />
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
      </div>
    </AppBar>
  );
};

export default withRouter(NavBar);
