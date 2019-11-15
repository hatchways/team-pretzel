import React from "react";
import AppBarDrawer from "./container/AppBarDrawer";
import { setAuthToken } from "../utils/helpers";

class Dashboard extends React.Component {
  handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    this.props.history.push("/signin");
  };

  componentDidMount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
  }

  render() {
    return (
      <>
        <AppBarDrawer handleLogOut={this.handleLogOut} />
      </>
    );
  }
}

export default Dashboard;
