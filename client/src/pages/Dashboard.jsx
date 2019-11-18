import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBarDrawer from "./container/AppBarDrawer";
import ContentContainer from "./container/ContentContainer";
import DashboardDefault from "./container/DashboardDefault";
import Friends from "./container/Friends";
import { setAuthToken } from "../utils/helpers";
import jwt_decode from "jwt-decode";
import useGet from "../utils/hooks/useGet";

const Dashboard = ({ history, match }) => {
  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    history.push("/signin");
  };

  const user = useGet("/api/v1/users/profile", "user");

  useEffect(() => {
    // check if jwt in localstorage
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      // current time
      const currentTime = Date.now() / 1000;
      // compare current time and token exp
      // if exp time > current time - sign in
      if (currentTime < decoded.exp) {
        setAuthToken(localStorage.jwtToken);
      } else {
        // remove token from lstorage
        handleLogOut();
      }
    } else {
      handleLogOut();
    }
  }, []);

  return (
    <Router>
      <AppBarDrawer user={user} handleLogOut={handleLogOut} />
      <ContentContainer>
        <Route
          exact
          path={match.path}
          //component={DashboardDefault}
          render={props => <DashboardDefault {...props} user={user} />}
        />
        <Route path={`${match.path}/friends`} component={Friends} />
      </ContentContainer>
    </Router>
  );
};

export default Dashboard;
