import React from "react";
import { Container, Typography, Divider } from "@material-ui/core";
import FriendListCard from "../presentational/FriendListCard";
import FriendListDialog from "../presentational/FriendListDialog";
import PollDialog from "../presentational/PollDialog";
import PollCard from "../presentational/PollCard";

const DashboardDefault = ({ user }) => {
  return (
    <>
      <Container style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography>Friend Lists</Typography>
          <FriendListDialog />
        </div>
        <FriendListCard />
      </Container>
      <Divider />
      <Container style={{ marginTop: "1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography>Polls</Typography>
          <PollDialog />
        </div>
        <PollCard user={user} />
      </Container>
    </>
  );
};

export default DashboardDefault;
