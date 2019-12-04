import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import NavBar from "../components/Nav/NavBar";
import ContentContainer from "../components/Dashboard/ContentContainer";
import DashboardDefault from "../components/Dashboard/DashboardDefault";
import Friends from "./Friends";
import VotePage from "./VotePage";
import FriendsPolls from "./FriendsPolls";
import socket from "../utils/socket";

const Dashboard = ({ history }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let _isMounted = true;
    const token = localStorage.getItem("jwtToken");
    const getFriends = async () => {
      try {
        const res = await axios.get("/api/v1/friends", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (_isMounted) setFriends(res.data.friends);
      } catch (error) {
        setError(error);
      }
    };

    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (_isMounted) {
          setUser(res.data.user);
          socket.emit("user_online", user);
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
    getFriends();
    return () => (_isMounted = false);
  }, []);

  useEffect(() => {
    socket.on("profile_updated", updatedUser => {
      setUser(updatedUser);
    });
  }, [user]);

  if (error) return <div>Error: {error}</div>;
  if (error) {
    console.log("error", error);
  }

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    socket.emit("user_offline", user);
    history.push("/signin");
  };

  const handleAddorRemoveFriend = async friendId => {
    const res = await axios.put(`/api/v1/friends/${friendId}`);
    console.log("add or remove res: ", res.data.friends);

    // setFriends(res.data.friends);
  };

  return !user ? (
    <CircularProgress />
  ) : (
    <Router>
      <NavBar user={user} handleLogOut={handleLogOut} />
      <ContentContainer friends={friends} setFriends={setFriends}>
        <Route
          exact
          path="/dashboard"
          render={() => <DashboardDefault user={user} />}
        />
        <Route
          exact
          path="/friends"
          render={props => (
            <Friends
              {...props}
              friends={friends}
              handleAddorRemoveFriend={handleAddorRemoveFriend}
            />
          )}
        />

        <Route exact path={"/friends-polls"} render={() => <FriendsPolls />} />

        <Route
          exact
          path="/polls/:pollId"
          render={() => <VotePage user={user} />}
        />
      </ContentContainer>
    </Router>
  );
};

export default Dashboard;
