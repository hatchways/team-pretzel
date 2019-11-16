import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBarDrawer from "./container/AppBarDrawer";
import { setAuthToken } from "../utils/helpers";
import ContentContainer from "./container/ContentContainer";
import MainContent from "./container/MainContent";

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
    <Router>
      <AppBarDrawer handleLogOut={handleLogOut} />
      <ContentContainer>
        <Route exact path="/dashboard" component={MainContent} />
      </ContentContainer>
    </Router>
  );
};

export default Dashboard;
