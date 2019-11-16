import React, { Fragment } from "react";
import { Formik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  ListItemSecondaryAction,
  makeStyles
} from "@material-ui/core";

const dummy = [
  {
    id: 1,
    name: "john"
  },
  {
    id: 2,
    name: "jane"
  },
  {
    id: 3,
    name: "jim"
  },
  {
    id: 4,
    name: "john"
  },
  {
    id: 5,
    name: "jane"
  },
  {
    id: 6,
    name: "jim"
  },
  {
    id: 7,
    name: "john"
  },
  {
    id: 8,
    name: "jane"
  },
  {
    id: 9,
    name: "jim"
  },
  {
    id: 10,
    name: "john"
  },
  {
    id: 11,
    name: "jane"
  },
  {
    id: 12,
    name: "jim"
  }
];

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
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

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
                    {dummy.map(person => {
                      return (
                        <ListItem key={person.id}>
                          <ListItemText>{person.name}</ListItemText>
                          <ListItemSecondaryAction>
                            <Checkbox
                              name="friendsToAdd"
                              onChange={handleChange}
                              value={person.id}
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
