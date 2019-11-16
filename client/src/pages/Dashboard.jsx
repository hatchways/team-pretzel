import React, { useEffect } from "react";
import AppBarDrawer from "./container/AppBarDrawer";
import { setAuthToken } from "../utils/helpers";

const Dashboard = ({ history }) => {
  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    history.push("/signin");
  };

  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
  }, []);

  return (
    <>
      <AppBarDrawer handleLogOut={handleLogOut} />
    </>
  );
};

export default Dashboard;
