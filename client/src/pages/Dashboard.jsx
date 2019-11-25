import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import AppBarDrawer from "./container/AppBarDrawer";
import ContentContainer from "./container/ContentContainer";
import DashboardDefault from "./container/DashboardDefault";
import Friends from "./container/Friends";
// import { setAuthToken } from "../utils/helpers";
// import jwt_decode from "jwt-decode";
// import useGet from "../utils/hooks/useGet";
import socket from "../utils/socket";
import VotePage from "./container/VotePage";
import FriendsPolls from "./container/FriendsPolls";

const Dashboard = ({ history }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwtToken");
      const res = await axios.get("/api/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const fetchedUser = await res.data.user;
      setUser(fetchedUser);
    };
    fetchData();
  }, []);

  if (user) {
    socket.emit("user_online", user);
    socket.on("user_online", () => {});
  }

  console.log(user);

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    socket.emit("user_offline", user);
    socket.on("user_offline", () => {});
    history.push("/signin");
  };

  // useEffect(() => {
  //   // check if jwt in localstorage
  //   if (localStorage.jwtToken) {
  //     const decoded = jwt_decode(localStorage.jwtToken);
  //     // current time
  //     const currentTime = Date.now() / 1000;
  //     // compare current time and token exp
  //     // if exp time > current time - sign in
  //     if (currentTime < decoded.exp) {
  //       setAuthToken(localStorage.jwtToken);
  //     } else {
  //       // remove token from lstorage
  //       handleLogOut();
  //     }
  //   } else {
  //     handleLogOut();
  //   }
  // }, []);

  return !user ? (
    <CircularProgress />
  ) : (
    <Router>
      <AppBarDrawer user={user} handleLogOut={handleLogOut} />
      <ContentContainer user={user}>
        <Route
          exact
          path="/dashboard"
          render={props => <DashboardDefault user={user} />}
        />
        <Route exact path="/friends" render={() => <Friends user={user} />} />

        <Route
          exact
          path={"/friends-polls"}
          render={() => <FriendsPolls user={user} />}
        />

        <Route exact path="/polls/:pollId" component={VotePage} />
      </ContentContainer>
    </Router>
  );
};

export default Dashboard;
