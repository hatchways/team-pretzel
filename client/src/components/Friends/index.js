import React from "react";
import { ListItem, ListItemAvatar, Avatar } from "@material-ui/core";

const Friends = ({ friends }) => {
  return (
    <>
      {friends.map(friend => (
        <ListItem key={friend.id}>
          <ListItemAvatar>
            <Avatar alt={friend.name} src={friend.avatar} />
          </ListItemAvatar>
          {friend.name}
        </ListItem>
      ))}
    </>
  );
};

export default Friends;
