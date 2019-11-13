import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  Avatar,
  Paper,
  Popper,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList
} from "@material-ui/core";
import FriendList from "../FriendList";
import ProfileDialog from "../../pages/presentational/ProfileDialog";

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
  button: {
    margin: theme.spacing(1),
    borderRadius: 100
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3)
  // },
  toobar: { position: "flex-end" },
  toolbar: theme.mixins.toolbar
}));

const AppBarDrawer = ({ friends, user, handleLogOut }) => {
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

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

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
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="classes.toolbar">
          <Link to="#" className={classes.menuButton}>
            <Button>Friends</Button>
          </Link>
          <Link to="#" className={classes.menuButton}>
            <Button>Friends poll</Button>
          </Link>
          <Link to="#" className={classes.menuButton}>
            <Button>Opinions</Button>
          </Link>
          <Link to="#" className={classes.menuButton}>
            <Button variant="outlined" size="small" className={classes.button}>
              Create Poll
            </Button>
          </Link>
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Avatar alt={user.name} src={user.avatar} />
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
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ProfileDialog
                          open={open}
                          handleDialog={handleDialog}
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
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <FriendList friends={friends} />
      </Drawer>
    </div>
  );
};

export default AppBarDrawer;
