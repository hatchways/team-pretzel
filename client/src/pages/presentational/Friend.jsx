import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, Avatar, Typography } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import OnlineBadge from "./OnlineBadge";

const useStyles = makeStyles({
  name: {
    marginLeft: "2rem"
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
          {friend.online ? (
            <OnlineBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              variant="dot"
            >
              <Avatar
                className={classes.avatar}
                alt={friend.name}
                src={friend.avatar}
              />
            </OnlineBadge>
          ) : (
            <Avatar alt={friend.name} src={friend.avatar} />
          )}
          {/*<OnlineBadge>
            <Avatar
              className={classes.avatar}
              alt={friend.name}
              src={friend.avatar}
            />
          </OnlineBadge>*/}
          {/*friend.online ? (
            <FiberManualRecordIcon
              className={classes.status}
              style={{ color: "#1EA362" }}
            />
          ) : (
            <FiberManualRecordIcon
              className={classes.status}
              color="disabled"
            />
          )*/}

          <Typography className={classes.name} variant="body2">
            {friend.name}
          </Typography>
        </ListItem>
      ))}
    </>
  );
};

export default Friend;
