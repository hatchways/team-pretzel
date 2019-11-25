import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import AppBarDrawer from "./container/AppBarDrawer";
import ContentContainer from "./container/ContentContainer";
import DashboardDefault from "./container/DashboardDefault";
import Friends from "./container/Friends";
import socket from "../utils/socket";
import VotePage from "./container/VotePage";
import FriendsPolls from "./container/FriendsPolls";

const Dashboard = ({ history }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let _isMounted = true;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const res = await axios.get("/api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (_isMounted) setUser(res.data.user);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
    return () => (_isMounted = false);
  }, []);

  if (error) return <div>Error: {error}</div>;

  if (user && !error) {
    socket.emit("user_online", user);
    socket.on("user_online", () => {});
  }

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    socket.emit("user_offline", user);
    socket.on("user_offline");
    history.push("/signin");
  };

  return !user ? (
    <CircularProgress />
  ) : (
    <Router>
      <AppBarDrawer user={user} handleLogOut={handleLogOut} />
      <ContentContainer user={user}>
        <Route
          exact
          path="/dashboard"
          render={() => <DashboardDefault user={user} />}
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
