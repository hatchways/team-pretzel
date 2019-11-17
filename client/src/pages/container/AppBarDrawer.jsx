import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
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

const AppBarDrawer = ({ handleLogOut }) => {
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

  const getUser = async () => {
    const response = await axios.get("/api/v1/users/profile");
    setUser(response.data.data.user);
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    getUser();
  }, []);

  let match = useRouteMatch("/dashboard");

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link to={`${match.path}/friends`} className={classes.menuButton}>
            <Button>Friends</Button>
          </Link>
          <Link to="#" className={classes.menuButton}>
            <Button>Friends poll</Button>
          </Link>
          <Link to="#" className={classes.menuButton}>
            <Button>Opinions</Button>
          </Link>
          <Link to="#" className={classes.menuButton}>
            <PollDialog />
          </Link>
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
      {/*</div><Drawer
      //   className={classes.drawer}
      //   variant="permanent"
      //   classes={{
      //     paper: classes.drawerPaper
      //   }}
      // >
      //   <div className={classes.toolbar} />
      //   <FriendList />
      </Drawer>*/}
    </div>
  );
};

export default AppBarDrawer;
