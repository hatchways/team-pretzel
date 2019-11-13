import React from "react";
import AppBarDrawer from "../../components/AppBarDrawer";
import axios from "axios";

class Dashboard extends React.Component {
  state = {
    user: {},
    friends: [],
    authenticated: false
  };

  componentDidMount() {
    this.getUser();
    this.getFriends();
  }

  getUser = async () => {
    const response = await axios.get("/api/v1/users/profile");
    this.setState({ authenticated: true, user: response.data.data.user });
  };

  getFriends = async () => {
    const response = await axios.get("/api/v1/users");
    this.setState({ friends: response.data.data.users });
  };

  handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    this.setState({
      user: {},
      friends: [],
      authenticated: false
    });
  };

  render() {
    return (
      <>
        <AppBarDrawer
          friends={this.state.friends}
          user={this.state.user}
          handleLogOut={this.handleLogOut}
        />
      </>
    );
  }
}

export default Dashboard;
