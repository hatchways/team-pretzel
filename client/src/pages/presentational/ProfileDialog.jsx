import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField
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
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const loadImage = event => {
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    URL.revokeObjectURL(output);
  };

  return (
    <React.Fragment>
      <Button color="primary" onClick={handleClickOpen}>
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
          <Formik
            initialValues={{ name: "", avatar: null }}
            validateOnChange={false}
            onSubmit={async ({ name, avatar }) => {
              let formData = new FormData();
              formData.append("name", name);
              formData.append("avatar", avatar);
              await axios.patch("/api/v1/users/profile/update", formData);
            }}
          >
            {({
              errors,
              handleSubmit,
              handleChange,
              values,
              setFieldValue
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <TextField
                    value={values.name}
                    onChange={handleChange}
                    name="name"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Display name"
                    type="text"
                    fullWidth
                  />
                  <input
                    onChange={event => {
                      setFieldValue("avatar", event.currentTarget.files[0]);
                      loadImage(event);
                    }}
                    name="avatar"
                    accept="image/*"
                    className={classes.input}
                    style={{ display: "none" }}
                    id="file-upload-button"
                    multiple
                    type="file"
                  />

                  <img id="output" />
                  <label htmlFor="file-upload-button">
                    <Button component="span">Upload avatar</Button>
                  </label>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary" type="submit">
                      Save
                    </Button>
                  </DialogActions>
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ProfileDialog;
