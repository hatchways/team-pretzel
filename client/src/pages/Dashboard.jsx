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
    display: "flex",
    backgroundColor: "#e8e8e8",
    height: "100vh"
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: "white"
    },
    backgroundColor: "white"
  },
  logo: {
    height: "4rem",
    width: "4rem",
    [theme.breakpoints.down("xs")]: { display: "none" }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    [theme.breakpoints.down("xs")]: { display: "none" }
  },
  drawerLogo: {
    height: "4rem",
    width: "4rem",
    [theme.breakpoints.up("sm")]: { display: "none" }
  },
  drawerMenuButton: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    [theme.breakpoints.up("sm")]: { display: "none" }
  },
  drawerButton: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    color: "black",
    [theme.breakpoints.up("sm")]: { display: "none" }
  },
  drawerDivider: {
    marginTop: "2rem",
    [theme.breakpoints.up("sm")]: { display: "none" }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: {
    ...theme.mixins.toolbar
  },
  name: {
    marginLeft: "0.5rem"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
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
  const [potentialFriends, setPotentialFriends] = useState([]);

  // Drawer toggle
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

        if (_isMounted) {
          setFriends(res.data.friends.friends);
          setPotentialFriends(res.data.potentialFriends);
        }
      } catch (error) {
        setError(error);
      }
    };

    const fetchUser = async () => {
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

    fetchUser();
    getFriends();

    return () => (_isMounted = false);
  }, []);

  useEffect(() => {
    socket.on("friends_updated", updatedFriends => {
      setFriends(updatedFriends.friends.friends);
      setPotentialFriends(updatedFriends.potentialFriends);
    });

    socket.on("profile_updated", updatedUser => {
      setUser(updatedUser);
    });
  }, [user]);

  if (error) return <div>Error: {error.message}</div>;

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    socket.emit("user_offline", user);
    history.push("/signin");
  };

  const handleAddorRemoveFriend = async friendId => {
    await axios.patch(`/api/v1/friends/${friendId}`);
    socket.emit("friends_updated", user.friends[0]._id);
  };

  return !user || !friends || !potentialFriends ? (
    <CircularProgress />
  ) : (
    <Router>
      <div className={classes.root}>
        <NavBar
          classes={classes}
          user={user}
          handleLogOut={handleLogOut}
          handleDrawerToggle={handleDrawerToggle}
        />
        <FriendsDrawer
          classes={classes}
          friends={friends}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          user={user}
        />
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
                potentialFriends={potentialFriends}
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
