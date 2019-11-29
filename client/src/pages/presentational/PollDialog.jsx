import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  FormControl,
  Card,
  CardMedia,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import axios from "axios";

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
    width: "100%",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  card: {
    height: "250",
    width: 350,
    objectFit: "contain"
  },
  cardMedia: {
    height: 250,
    width: 350
  },
  buttons: {
    marginTop: "2rem"
  }
});

const PollDialog = ({ user, addPoll }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [friendLists, setFriendLists] = useState([]);

  const getFriendLists = async id => {
    const response = await axios.get(`/api/v1/friend-lists/${id}`);
    setFriendLists(response.data.friendLists);
  };

  const handleClickOpen = () => {
    getFriendLists(user._id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          {user && user.friendLists && user.friendLists.length ? (
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
                formData.append("taggedFriendLists", friendList);
                addPoll(formData);
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
                          {friendLists.map(friendList => (
                            <MenuItem
                              value={friendList._id}
                              key={friendList._id}
                            >
                              {friendList.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div className={classes.imagesInput}>
                      <Card className={classes.card}>
                        {values.images[0] ? (
                          <CardMedia
                            component="img"
                            className={classes.cardMedia}
                            src={URL.createObjectURL(values.images[0])}
                            title="First option"
                          />
                        ) : (
                          <ImageDropzone
                            onDrop={files => {
                              setFieldValue("images", [
                                ...values.images,
                                files[0]
                              ]);
                            }}
                          />
                        )}
                      </Card>
                      <Card className={classes.card}>
                        {values.images[1] ? (
                          <CardMedia
                            component="img"
                            className={classes.cardMedia}
                            src={URL.createObjectURL(values.images[1])}
                            title="Second option"
                          />
                        ) : (
                          <ImageDropzone
                            onDrop={files => {
                              setFieldValue("images", [
                                ...values.images,
                                files[0]
                              ]);
                            }}
                          />
                        )}
                      </Card>
                    </div>

                    <DialogActions className={classes.buttons}>
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
