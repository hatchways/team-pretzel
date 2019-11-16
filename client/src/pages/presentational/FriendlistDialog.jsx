import React, { Fragment, useEffect, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  makeStyles
} from "@material-ui/core";

const initialValues = {
  title: "",
  friendsToAdd: []
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: 100
  }
}));

const FriendlistDialog = props => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [friends, setFriends] = useState([]);

  const getAllUsers = async () => {
    const result = await axios.get("/api/v1/users");
    const users = result.data.data.users;
    setFriends(users);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Fragment>
      <Button
        variant="outlined"
        size="small"
        className={classes.button}
        onClick={handleClick}
      >
        Create List
      </Button>
      <Dialog
        aria-labelledby="friendlist-dialog"
        maxWidth="md"
        open={open}
        onClose={handleClick}
      >
        <DialogTitle id="friendlist-dialog-title">
          Create a friend list
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log(values);
          }}
        >
          {({ handleSubmit, handleChange, values }) => {
            return (
              <DialogContent>
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                    placeholder="Enter name of list"
                  />
                  <List>
                    {friends.map(friend => {
                      return (
                        <ListItem key={friend.id}>
                          <ListItemText>{friend.name}</ListItemText>
                          <ListItemSecondaryAction>
                            <Checkbox
                              name="friendsToAdd"
                              onChange={handleChange}
                              value={friend.id}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                  <Button type="submit">Create</Button>
                </form>
              </DialogContent>
            );
          }}
        </Formik>
      </Dialog>
    </Fragment>
  );
};

export default FriendlistDialog;
