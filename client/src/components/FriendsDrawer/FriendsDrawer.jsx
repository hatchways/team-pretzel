import React, { useState } from "react";
import { Drawer, Hidden } from "@material-ui/core";
import FriendList from "../FriendList/FriendList";
import { ThemeProvider } from "@material-ui/styles";

const FriendsDrawer = ({
  classes,
  friends,
  container,
  handleDrawerToggle,
  mobileOpen
}) => {
  const drawerContent = (
    <>
      <div className={classes.toolbar} />
      <FriendList friends={friends} />
    </>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          classes={{ paper: classes.drawPaper }}
          anchor={ThemeProvider.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          container={container}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer classes={{ paper: classes.drawPaper }} variant="permanent" open>
          {drawerContent}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default FriendsDrawer;
