import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, Avatar } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles({
  avatar: {
    marginRight: "2rem"
  },
  status: {
    float: "right",
    position: "absolute",
    top: "0.5rem",
    left: "3rem",
    fontSize: "large"
  }
});

const Friend = ({ friends }) => {
  const classes = useStyles();
  return (
    <>
      {friends.map(friend => (
        <ListItem key={friend.id}>
          <Avatar
            className={classes.avatar}
            alt={friend.name}
            src={friend.avatar}
          />
          {friend.online ? (
            <FiberManualRecordIcon
              className={classes.status}
              style={{ color: "#1EA362" }}
            />
          ) : (
            <FiberManualRecordIcon
              className={classes.status}
              color="disabled"
            />
          )}

          {friend.name}
        </ListItem>
      ))}
    </>
  );
};

export default Friend;
