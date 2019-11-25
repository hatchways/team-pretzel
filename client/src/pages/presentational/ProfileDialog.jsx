import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from "@material-ui/core";

import ImageDropzone from "./ImageDropzone";

const ProfileDialog = ({ user }) => {
  const [open, setOpen] = useState(false);
  const handleDialog = () => {
    setOpen(!open);
  };

  const loadImage = files => {
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(files[0]);
    URL.revokeObjectURL(output);
  };

  return (
    <React.Fragment>
      <p onClick={handleDialog}>Update profile</p>
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

                  {values.avatar ? (
                    <img id="output" alt="upload preview" />
                  ) : (
                    <ImageDropzone
                      onDrop={files => {
                        setFieldValue("avatar", files[0]);
                        loadImage(files, "output");
                      }}
                    />
                  )}

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
