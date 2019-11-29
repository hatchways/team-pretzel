import React from "react";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider
} from "@material-ui/core";
import moment from "moment";

const VoteListItem = ({ name, avatar, imageUrl, timestamp }) => {
  return (
    <>
      <div style={{ display: "flex", margin: "1rem" }}>
        <ListItemAvatar>
          <Avatar alt={name} src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={`${name} voted`}
          secondary={moment(timestamp).fromNow()}
        />

        <img
          style={{ width: "4rem", height: "4rem" }}
          src={imageUrl}
          alt="Not found"
        />
      </div>
      <Divider />
    </>
  );
};

export default VoteListItem;
