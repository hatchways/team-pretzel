import React from "react";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import ProfileDialog from "../Dashboard/ProfileDialog";
import logo from "../../assets/logo.jpg";

const ToolbarLinks = ({ menuButtonClass, logoClass, user }) => (
  <>
    <>
      <NavLink exact to="/dashboard">
        <img src={logo} alt="logo" className={logoClass} />
      </NavLink>
    </>
    <>
      <NavLink exact to="/friends" className={menuButtonClass}>
        <Button>Friends</Button>
      </NavLink>

      <NavLink exact to="/friends-polls" className={menuButtonClass}>
        <Button>Friends poll</Button>
      </NavLink>

      <ProfileDialog user={user} menuButtonClass={menuButtonClass} />
    </>
  </>
);

export default ToolbarLinks;
