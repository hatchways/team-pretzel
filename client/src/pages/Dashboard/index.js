import React from "react";
import AppBarDrawer from "../../components/AppBarDrawer";
import axios from "axios";

class Dashboard extends React.Component {
  state = {
    user: {},
    friends: [{ first_name: "jack" }],
    authenticated: false
  };

  componentDidMount() {
    this.getUser();
    this.getFriends();
  }

  getUser = async () => {
    const response = await axios.get("https://reqres.in/api/users/2");

    this.setState({ authenticated: true, user: response.data.data });
  };

  getFriends = async () => {
    const response = await axios.get("https://reqres.in/api/users?page=2");
    this.setState({ friends: response.data.data });
  };

  render() {
    return (
      <>
        <AppBarDrawer friends={this.state.friends} user={this.state.user} />
      </>
    );
  }
}

export default Dashboard;
