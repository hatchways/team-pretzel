import React from "react";
import Dropzone from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dropzone: {
    backgroundColor: "#eee",
    display: "flex",
    height: "15rem",
    width: "22.5rem",
    margin: "0.5rem",
    cursor: "pointer"
  }
});

const ImageDropzone = ({ onDrop }) => {
  const classes = useStyles();
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className={classes.dropzone}>
          <input accept="image/*" {...getInputProps()} />
          <p>Drag 'n' an image</p>
        </div>
      )}
    </Dropzone>
  );
};

export default ImageDropzone;
