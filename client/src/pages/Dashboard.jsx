import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CircularProgress, makeStyles } from "@material-ui/core";
import NavBar from "../components/Nav/NavBar";
import DashboardDefault from "../components/Dashboard/DashboardDefault";
import Friends from "./Friends";
import VotePage from "./VotePage";
import FriendsPolls from "./FriendsPolls";
import FriendsDrawer from "../components/FriendsDrawer/FriendsDrawer";
import socket from "../utils/socket";

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white"
  },
  logo: {
    height: "4rem",
    width: "4rem",
    marginLeft: "5rem",
    position: "absolute"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    textDecoration: "none"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: {
    marginLeft: "auto",
    marginRight: "5rem",
    ...theme.mixins.toolbar
  },
  name: {
    marginLeft: "0.5rem"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  }
}));

const Dashboard = ({ history }) => {
  const classes = useStyles();

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
        if (_isMounted) setUser(res.data.user);
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

    socket.emit("user_online", user);
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
      <div className={classes.root}>
        <NavBar classes={classes} user={user} handleLogOut={handleLogOut} />
        <FriendsDrawer classes={classes} friends={friends} />
        <main className={classes.content}>
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

          <Route
            exact
            path={"/friends-polls"}
            render={() => <FriendsPolls />}
          />

          <Route
            exact
            path="/polls/:pollId"
            render={() => <VotePage user={user} />}
          />
        </main>
      </div>
    </Router>
  );
};

export default Dashboard;
