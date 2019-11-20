import React from "react";
import axios from "axios";
import { Formik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ImageDropzone from "./ImageDropzone";

const useStyles = makeStyles({
  button: {
    borderRadius: 100
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "2rem 0"
  },
  textInput: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  inputField: {
    marginBottom: "2rem",
    width: "100%"
  },
  imagesInput: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "row"
  }
});

const PollDialog = ({ user }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const loadImage = (files, id) => {
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
      <Dialog open={open} onClose={handleClose} maxWidth={false}>
        <DialogContent>
          {user && user.friendLists ? (
            <Formik
              initialValues={{
                question: "",
                images: [],
                createdBy: user.id || "",
                friendList: ""
              }}
              validateOnChange={false}
              onSubmit={async ({ question, images, friendList, createdBy }) => {
                let formData = new FormData();
                formData.append("question", question);
                images.map(image => formData.append("images", image));
                formData.append("createdBy", createdBy);
                formData.append("friendList", friendList);
                await axios.post("/api/v1/polls", formData);
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
                  <form
                    onSubmit={handleSubmit}
                    className={classes.formContainer}
                  >
                    <div className={classes.textInput}>
                      <TextField
                        className={classes.inputField}
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
                      <FormControl
                        variant="outlined"
                        className={classes.inputField}
                      >
                        <InputLabel htmlFor="friend-list">
                          Friend list
                        </InputLabel>

                        <Select
                          variant="outlined"
                          id="friend-list"
                          onChange={handleChange}
                          value={values.friendList}
                          name="friendList"
                        >
                          {user.friendLists.map(friendList => (
                            <MenuItem
                              value={friendList.title}
                              key={friendList.id}
                            >
                              {friendList.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div className={classes.imagesInput}>
                      {values.images[0] ? (
                        <img id="output1" alt="First option" />
                      ) : (
                        <ImageDropzone
                          onDrop={files => {
                            setFieldValue("images", [
                              ...values.images,
                              files[0]
                            ]);
                            loadImage(files, "output1");
                          }}
                        />
                      )}

                      {values.images[1] ? (
                        <img id="output2" alt="Second option" />
                      ) : (
                        <ImageDropzone
                          onDrop={files => {
                            setFieldValue("images", [
                              ...values.images,
                              files[0]
                            ]);
                            loadImage(files, "output2");
                          }}
                        />
                      )}
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
          ) : (
            <h3>
              You currently have no friend lists. Please make a friend list
              before creating a new poll.
            </h3>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default PollDialog;
