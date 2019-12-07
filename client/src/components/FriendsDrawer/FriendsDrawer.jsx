import React from "react";
import { Drawer, Hidden, Divider } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import FriendList from "../FriendList/FriendList";
import ToolbarLinks from "../Nav/ToolbarLinks";

const FriendsDrawer = ({
  classes,
  friends,
  container,
  handleDrawerToggle,
  mobileOpen,
  user
}) => {
  const drawerContent = (
    <>
      <div className={classes.toolbar} />
      <ToolbarLinks
        menuButtonClass={classes.drawerMenuButton}
        logoClass={classes.drawerLogo}
        user={user}
      />
      <Divider className={classes.drawerDivider} />
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
