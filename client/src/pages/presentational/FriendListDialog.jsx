import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import { FriendListSchema } from "../../utils/validation";
import axios from "axios";
import {
  Button,
  CircularProgress,
  FormHelperText,
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

import useGet from "../../utils/hooks/useGet";

const initialValues = {
  title: "",
  friendsToAdd: []
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: 100
  },
  title: {
    textAlign: "center"
  },
  input: {
    width: "100%"
  }
}));

const FriendListDialog = () => {
  const friends = useGet("/api/v1/friends", "friends");

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return !friends ? (
    <CircularProgress />
  ) : (
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
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClick}
      >
        <DialogTitle className={classes.title} id="friendlist-dialog-title">
          Create a friend list
        </DialogTitle>
        <Formik
          validationSchema={FriendListSchema}
          initialValues={initialValues}
          validateOnChange={false}
          onSubmit={async ({ title, friendsToAdd }, actions) => {
            // values are the data to be sent to backend POST request
            const res = axios.post(
              "/api/v1/friend-lists",
              { title, friendIds: friendsToAdd },
              {
                headers: { Authorization: `Bearer ${localStorage.jwtToken}` }
              }
            );
            handleClick();
          }}
        >
          {({ errors, handleSubmit, handleChange, values }) => {
            console.log(errors);
            return (
              <DialogContent>
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                    placeholder="Enter name of list"
                    className={classes.input}
                  />
                  {errors.title ? (
                    <FormHelperText error>{errors.title}</FormHelperText>
                  ) : null}
                  {errors.friendsToAdd ? (
                    <FormHelperText error>{errors.friendsToAdd}</FormHelperText>
                  ) : null}
                  <List>
                    {friends.friends.map(friend => {
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

export default FriendListDialog;
