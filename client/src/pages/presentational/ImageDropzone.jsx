import React from "react";
import Dropzone from "react-dropzone";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    height: 250,
    width: 350
  },
  dropzone: {
    width: "100%",
    height: "100%",
    cursor: "pointer",
    textAlign: "center"
  }
});

const ImageDropzone = ({ onDrop }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={classes.dropzone}>
            <input accept="image/*" {...getInputProps()} />
            <p>Drag 'n' drop an image</p>
          </div>
        )}
      </Dropzone>
    </Card>
  );
};

export default ImageDropzone;
