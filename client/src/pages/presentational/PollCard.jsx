import React from "react";
import { makeStyles, Card, CardContent, CardHeader } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";

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

const PollCard = ({ question, images }) => {
  const classes = useStyles();

  let numberOfVotes = 0;

  // Add up the total number of votes
  images.forEach(image => (numberOfVotes += image.castBy.length));

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title={question}
        subheader={numberOfVotes}
      />
      <CardContent className={classes.cardContent}>
        {images.map(image => (
          <div key={image._id} style={{ marginRight: "0.5rem" }}>
            <img className={classes.images} src={image.url} alt="random" />
            <Favorite color="secondary" />
            {image.castBy.length}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PollCard;
