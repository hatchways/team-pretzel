import React from "react";
import axios from "axios";
import { Formik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ImageDropzone from "./ImageDropzone";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: 100
  },
  dialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    display: "flex",
    flexDirection: "row"
  },
  input: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1.5
  }
}));

const PollDialog = ({ user }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // demo data for now
  const friendLists = [
    { id: 0, title: "Music" },
    { id: 1, title: "Fashion" },
    { id: 2, title: "Bookworms" }
  ];

  const loadImage = (files, id) => {
    console.log(files);
    const output = document.getElementById(`${id}`);
    output.src = URL.createObjectURL(files[0]);
    URL.revokeObjectURL(output);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        size="small"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Create Poll
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a poll</DialogTitle>
        <DialogContent>
          {/*  <DialogContentText>
            This is where you can create a new poll.
          </DialogContentText> */}
          {user ? (
            <Formik
              initialValues={{
                question: "",
                images: [],
                createdBy: user.id,
                friendList: ""
              }}
              validateOnChange={false}
              onSubmit={async ({ question, images, friendList, createdBy }) => {
                let formData = new FormData();
                formData.append("question", question);
                images.map(image => formData.append("images", image));
                formData.append("createdBy", createdBy);
                await axios.post("/api/v1/polls/new-poll", formData);
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
                  <form onSubmit={handleSubmit} className={classes.dialog}>
                    <div className={classes.form}>
                      <div className={classes.input}>
                        <h3>Question</h3>
                        <TextField
                          variant="outlined"
                          value={values.question}
                          onChange={handleChange}
                          name="question"
                          autoFocus
                          margin="dense"
                          label="Poll question"
                          type="text"
                          fullWidth
                        />

                        <h3>Friend list</h3>
                        <FormControl variant="outlined">
                          <InputLabel htmlFor="friend-list">
                            Friend list
                          </InputLabel>
                          <Select
                            id="friend-list"
                            onChange={handleChange}
                            value={values.friendList}
                          >
                            <MenuItem>
                              <em>None</em>
                            </MenuItem>
                            {friendLists.map(friendList => (
                              <MenuItem
                                value={values.friendList}
                                key={friendList.id}
                              >
                                {friendList.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>

                      <ImageDropzone
                        onDrop={files => {
                          console.log(files[0]);
                          setFieldValue("images", [...values.images, files[0]]);
                          loadImage(files, "output1");
                        }}
                      />

                      <img id="output1" />

                      <ImageDropzone
                        onDrop={files => {
                          console.log(files[0]);
                          setFieldValue("images", [...values.images, files[0]]);
                          loadImage(files, "output2");
                        }}
                      />
                      <img id="output2" />
                    </div>

                    <DialogActions>
                      <Button onClick={handleClose} color="secondary">
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        onClick={handleClose}
                        color="primary"
                      >
                        Create poll
                      </Button>
                    </DialogActions>
                  </form>
                );
              }}
            </Formik>
          ) : null}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default PollDialog;
