import React from "react";
import AppBarDrawer from "./container/AppBarDrawer";

class Dashboard extends React.Component {
  handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    this.props.history.push("/signin");
  };

  render() {
    return (
      <>
        <AppBarDrawer handleLogOut={this.handleLogOut} />
      </>
    );
  }
}

export default Dashboard;
