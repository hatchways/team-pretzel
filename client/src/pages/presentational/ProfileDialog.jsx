import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Card,
  CardMedia
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import socket from "../../utils/socket";
import ImageDropzone from "./ImageDropzone";

const useStyles = makeStyles({
  card: {
    height: "250",
    width: 350,
    objectFit: "contain",
    margin: "2rem 0"
  },
  cardMedia: {
    height: 250,
    width: 350
  },
  button: {
    borderRadius: 100
  }
});

const ProfileDialog = ({ user }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleDialog = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        size="small"
        className={classes.button}
        onClick={handleDialog}
      >
        Update Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        <DialogContent>
          <Formik
            enableReinitialize={true}
            initialValues={{ name: "", avatar: null }}
            validateOnChange={false}
            onSubmit={async ({ name, avatar }) => {
              let formData = new FormData();
              if (name) formData.append("name", name);
              if (avatar) formData.append("avatar", avatar);
              await axios.patch("/api/v1/users/profile", formData);
              socket.emit("profile_updated", user._id);
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

                  <Card className={classes.card}>
                    {values.avatar ? (
                      <CardMedia
                        component="img"
                        className={classes.cardMedia}
                        src={URL.createObjectURL(values.avatar)}
                        title="Your new avatar"
                      />
                    ) : (
                      <ImageDropzone
                        onDrop={files => {
                          setFieldValue("avatar", files[0]);
                        }}
                      />
                    )}
                  </Card>

                  <DialogActions>
                    <Button onClick={handleDialog} color="secondary">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDialog}
                      color="primary"
                      type="submit"
                    >
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
