import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  CircularProgress
} from "@material-ui/core";
import useGet from "../../utils/hooks/useGet";
import axios from "axios";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 275,
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    marginRight: "1.5rem"
  },
  cardHeader: { textAlign: "center", padding: "1.5rem 0" },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    padding: "1.5rem 0"
  },
  images: { width: "75px", height: "75px" }
});

const PollCard = ({ question, imageIds }) => {
  const classes = useStyles();

  const [images, setImages] = useState([]);
  // const pollImages = [
  //   imageIds.map(async imageId => {
  //     const result = await axios.get(`/api/v1/images/${imageId}`);
  //     console.log(result);
  //     if (result.data.image.length > 0) {
  //       pollImages.push(result.data.image);
  //     }
  //   })
  // ];

  useEffect(() => {
    imageIds.map(async imageId => {
      const result = await axios.get(`/api/v1/images/${imageId}`);
      console.log(result.data.image.url);

      setImages(result.data.imageId);
    });
  }, []);

  if (images) {
    console.log(images);
  }

  return !setImages ? (
    <CircularProgress />
  ) : (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title={question}
        subheader="20 answers"
      />
      <CardContent className={classes.cardContent}>
        {
          (images = undefined ? (
            <CircularProgress />
          ) : (
            images.map(image => (
              <div style={{ marginRight: "0.5rem" }}>
                <img
                  key={image._id}
                  className={classes.images}
                  src={image.url}
                  alt="random"
                />
              </div>
            ))
          ))
        }
        {/* <div style={{ marginLeft: "0.5rem" }}>
          <img
            className={classes.images}
            //src={pollImgPlaceholder}
            alt="random 2"
          />
        </div> */}
      </CardContent>
    </Card>
  );
};

export default PollCard;
