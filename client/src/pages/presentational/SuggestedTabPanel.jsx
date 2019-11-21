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

const SuggestedTabPanel = ({
  value,
  index,
  potentialFriends,
  handleAddFriend,
  inputValue
}) => {
  const classes = useStyles();
  return (
    <List className={classes.root} hidden={value !== index}>
      {potentialFriends === null ? (
        <div>...loading...</div>
      ) : (
        potentialFriends
          .filter(friends => {
            return friends.name
              .toLowerCase()
              .includes(inputValue.toLowerCase());
          })
          .map(potential => {
            return (
              <ListItem className={classes.listItem} key={potential.id}>
                <ListItemAvatar>
                  <Avatar alt={potential.name} src={potential.avatar} />
                </ListItemAvatar>
                <ListItemText>
                  <Typography>{potential.name}</Typography>
                </ListItemText>
                <ListItemSecondaryAction>
                  <Button
                    onClick={() => {
                      handleAddFriend(potential.id);
                    }}
                  >
                    Follow
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
      )}
    </List>
  );
};

export default SuggestedTabPanel;
