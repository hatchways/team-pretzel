import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  Avatar
} from "@material-ui/core";
import FriendList from "../FriendList";

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

export default function AppBarDrawer({ friends, user }) {
  const classes = useStyles();

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
            aria-controls="simple-menu"
            aria-haspopup="true"
            //onClick={handleClick}
          >
            <Avatar alt={user.first_name} src={user.avatar} />
            {user.first_name}
          </Button>
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
}
