import React from "react";
import { ListItem, ListItemAvatar, Avatar } from "@material-ui/core";

const Friends = ({ friends }) => {
  return (
    <>
      {friends.map(friend => (
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={friend.first_name} src={friend.avatar} />
          </ListItemAvatar>
          {friend.first_name}
        </ListItem>
      ))}
    </>
  );
};

export default Friends;
