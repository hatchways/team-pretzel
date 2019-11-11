import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  MenuItem
} from "@material-ui/core";

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  tab: {
    color: "red"
  }
});

const ProfileDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Update profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is where you can update your name and avatar.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Display name"
            type="email"
            fullWidth
          />
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id="file-upload-button"
            multiple
            type="file"
          />
          <label htmlFor="file-upload-button">
            <Button variant="raised" component="span">
              Upload avatar
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ProfileDialog;
