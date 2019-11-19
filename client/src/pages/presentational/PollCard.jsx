import React from "react";
import { makeStyles, Card, CardContent, CardHeader } from "@material-ui/core";
import useGet from "../../utils/hooks/useGet";

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

  const images = [];

  const res = useGet(`/api/v1/images/${imageIds[0]}`, "image");

  console.log(res);
  return !res ? (
    <></>
  ) : (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title={question}
        subheader="20 answers"
      />
      <CardContent className={classes.cardContent}>
        <div style={{ marginRight: "0.5rem" }}>
          <img className={classes.images} src={res.url} alt="random" />
        </div>
        <div style={{ marginLeft: "0.5rem" }}>
          <img
            className={classes.images}
            //src={pollImgPlaceholder}
            alt="random 2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PollCard;
