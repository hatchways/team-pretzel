import React from "react";
import { Drawer } from "@material-ui/core";
import FriendList from "../FriendList/FriendList";

const FriendsDrawer = ({ classes, friends }) => {
  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawPaper }}
      >
        <div className={classes.toolbar} />
        <FriendList friends={friends} />
      </Drawer>
    </>
  );
};

export default FriendsDrawer;
