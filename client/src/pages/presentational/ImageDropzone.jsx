import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dropzone: {
    height: "auto",
    border: "1px solid"
  }
});

const ImageDropzone = ({ onDrop }) => {
  const classes = useStyles();
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section className={classes.dropzone}>
          <div {...getRootProps()}>
            <input accept="image/*" {...getInputProps()} />
            <p>Drag 'n' an image</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default ImageDropzone;
