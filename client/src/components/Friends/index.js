import React from "react";
import { ListItem, ListItemAvatar, Avatar } from "@material-ui/core";

const Friends = ({ friends }) => {
  return (
    <>
      {friends.map(friend => (
        <ListItem>
          <ListItemAvatar>
            <Avatar key={friend.id} alt={friend.name} src={friend.avatar} />
          </ListItemAvatar>
          {friend.name}
        </ListItem>
      ))}
    </>
  );
};

export default Friends;
