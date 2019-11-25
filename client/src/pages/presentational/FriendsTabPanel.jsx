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

const FriendsTabPanel = ({
  value,
  index,
  friends,
  inputValue,
  handleAddorRemoveFriend
}) => {
  const classes = useStyles();
  return (
    <List className={classes.root} hidden={value !== index}>
      {!friends.length ? (
        <ListItem className={classes.listItem}>
          <Typography style={{ margin: "auto" }}>Get some friends</Typography>
        </ListItem>
      ) : (
        friends[0].friends
          .filter(friend => {
            return friend.name.toLowerCase().includes(inputValue.toLowerCase());
          })
          .map(friend => {
            return (
              <ListItem className={classes.listItem} key={friend.id}>
                <ListItemAvatar>
                  <Avatar alt={friend.name} src={friend.avatar} />
                </ListItemAvatar>
                <ListItemText>
                  <Typography>{friend.name}</Typography>
                </ListItemText>
                <ListItemSecondaryAction>
                  <Button
                    onClick={() => {
                      handleAddorRemoveFriend(friend.id);
                    }}
                  >
                    Unfollow
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
      )}
    </List>
  );
};

export default FriendsTabPanel;
