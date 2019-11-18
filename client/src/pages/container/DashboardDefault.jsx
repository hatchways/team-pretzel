import React from "react";
import { Container, Typography } from "@material-ui/core";
import FriendListCard from "../presentational/FriendListCard";
import FriendListDialog from "../presentational/FriendlistDialog";

const DashboardDefault = props => {
  return (
    <>
      <Container style={{ marginTop: "1rem" }}>
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
      <div>Polls</div>
    </>
  );
};

export default DashboardDefault;
