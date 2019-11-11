import React from "react";
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

const PollDialog = () => {
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

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Poll question"
            type="email"
            fullWidth
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="file-upload-button"
            multiple
            type="file"
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="file-upload-button"
            multiple
            type="file"
          />
          <label htmlFor="file-upload-button">
            <Button variant="raised" component="span">
              Upload image 1
            </Button>
            <Button variant="raised" component="span">
              Upload image 2
            </Button>
          </label>
        </DialogContent>

        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedA}
              onChange={handleChange("checkedA")}
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
              onChange={handleChange("checkedB")}
              value="checkedB"
              color="primary"
            />
          }
          label="Devs"
        />

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PollDialog;
