import React from "react";
import {
  makeStyles,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: "0"
  },
  listItem: {
    borderBottom: "0.5px solid lightgrey",
    padding: "1rem 2rem"
  }
});

const FriendsTabPanel = ({ value, index, friends }) => {
  const classes = useStyles();
  return (
    <List className={classes.root} hidden={value !== index}>
      {friends === null ? (
        <div>...loading...</div>
      ) : (
        friends.map(friend => {
          return (
            <ListItem className={classes.listItem} key={friend.id}>
              <ListItemAvatar>
                <Avatar alt={friend.name} src={friend.avatar} />
              </ListItemAvatar>
              <ListItemText>
                <Typography>{friend.name}</Typography>
              </ListItemText>
              <ListItemSecondaryAction>
                <Button>Follow</Button>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      )}
    </List>
  );
};

export default FriendsTabPanel;
