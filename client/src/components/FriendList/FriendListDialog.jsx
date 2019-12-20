import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import { FriendListSchema } from "../../utils/validation";
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
  ListItemSecondaryAction,
  makeStyles
} from "@material-ui/core";
import Friend from "../Friends/Friend";
import AddRemoveButton from "./AddRemoveButton";

const useStyles = makeStyles(theme => ({
  dialogButton: {
    margin: theme.spacing(1),
    borderRadius: 100,
    backgroundColor: "white"
  },
  title: {
    textAlign: "center"
  },
  input: {
    width: "100%"
  },
  button: {
    borderRadius: 100
  }
}));

const FriendListDialog = ({ addFriendList, friends }) => {
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
        className={classes.dialogButton}
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
          initialValues={{ title: "", friendsToAdd: [] }}
          validateOnChange={false}
          onSubmit={async ({ title, friendsToAdd }, actions) => {
            addFriendList({
              title,
              friendIds: friendsToAdd
            });
            actions.setSubmitting(false);
            handleClick();
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => {
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
                        <ListItem key={friend._id}>
                          <Friend friend={friend} />
                          <ListItemSecondaryAction>
                            <AddRemoveButton
                              id={friend._id}
                              friendsToAdd={values.friendsToAdd}
                              buttonClass={classes.button}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      type="submit"
                    >
                      Create
                    </Button>
                  </div>
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
