import React from "react";
import axios from "axios";
import { Formik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Button,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: 100
  }
}));

const PollDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedF: false,
    checkedG: false
  });

  const handleCheckboxChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const loadImage = (event, id) => {
    const output = document.getElementById(`${id}`);
    output.src = URL.createObjectURL(event.target.files[0]);
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
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is where you can create a new poll.
          </DialogContentText>

          <Formik
            initialValues={{
              question: "",
              images: [],
              createdBy: "5dc977146ba44931d80e537f",
              friendList: "5dc97a566ba44931d80e5383"
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
                <form onSubmit={handleSubmit}>
                  <TextField
                    value={values.question}
                    onChange={handleChange}
                    name="question"
                    autoFocus
                    margin="dense"
                    label="Poll question"
                    type="text"
                    fullWidth
                  />
                  <input
                    onChange={event => {
                      setFieldValue("images", [
                        ...values.images,
                        event.currentTarget.files[0]
                      ]);
                      loadImage(event, "output1");
                    }}
                    name="`images`"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="upload-button-1"
                    multiple
                    type="file"
                  />
                  <img id="output1" />
                  <input
                    onChange={event => {
                      setFieldValue("images", [
                        ...values.images,
                        event.currentTarget.files[0]
                      ]);
                      loadImage(event, "output2");
                    }}
                    name="images"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="upload-button-2"
                    multiple
                    type="file"
                  />
                  <img id="output2" />
                  <label htmlFor="upload-button-1">
                    <Button component="span">Upload image 1</Button>
                  </label>
                  <label htmlFor="upload-button-2">
                    <Button component="span">Upload image 2</Button>
                  </label>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedA}
                        onChange={handleCheckboxChange("checkedA")}
                        value="checkedA"
                        color="primary"
                      />
                    }
                    label="Hatchways"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleCheckboxChange("checkedB")}
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label="Devs"
                  />

                  <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleClose} color="primary">
                      Create
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

export default PollDialog;
