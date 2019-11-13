import React, { useState } from "react";
import NavBar from "./container/NavBar";
import FriendlistDialog from "./presentational/FriendlistDialog";

const Dashboard = ({ history }) => {
  const [open, setOpen] = useState(false);

  const handleDialog = () => {
    setOpen(!open);
  };

  return (
    <div>
      <NavBar history={history} />
      <button onClick={handleDialog}>create friend list</button>
      <FriendlistDialog open={open} handleDialog={handleDialog} />
    </div>
  );
};

export default Dashboard;
