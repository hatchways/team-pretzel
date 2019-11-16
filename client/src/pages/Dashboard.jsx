import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBarDrawer from "./container/AppBarDrawer";
import { setAuthToken } from "../utils/helpers";
import ContentContainer from "./container/ContentContainer";
import DashboardDefault from "./container/DashboardDefault";
import Friends from "./container/Friends";

const Dashboard = ({ history, match }) => {
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
    <Router>
      <AppBarDrawer handleLogOut={handleLogOut} />
      <ContentContainer>
        <Route exact path={match.path} component={DashboardDefault} />
        <Route path={`${match.path}/friends`} component={Friends} />
      </ContentContainer>
    </Router>
  );
};

export default Dashboard;
