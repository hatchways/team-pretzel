import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Button
} from "@material-ui/core";
import { Favorite, HighlightOff } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DeleteDialog from "../presentational/DeleteDialog";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 275,
    paddingTop: "0rem",
    paddingBottom: "1.5rem",
    marginRight: "1.5rem"
  },
  cardHeader: { textAlign: "center", padding: "0.5rem 0" },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    padding: "1.5rem 0"
  },
  media: {
    height: 120,
    width: 120
  },
  images: { width: "75px", height: "75px" },
  link: { textDecoration: "none", color: "black" }
});

const PollCard = ({ question, images, pollId, isUser = false, deletePoll }) => {
  const classes = useStyles();

  let numberOfVotes = 0;

  // Add up the total number of votes
  images.forEach(image => (numberOfVotes += image.castBy.length));

  return (
    <Card className={classes.card}>
      {isUser ? (
        <DeleteDialog
          title={question}
          deleteFunction={deletePoll}
          id={pollId}
        />
      ) : null}
      <Link to={`/polls/${pollId}`} className={classes.link}>
        <CardHeader
          className={classes.cardHeader}
          title={question}
          subheader={`${numberOfVotes} answers`}
        />
        <CardContent className={classes.cardContent}>
          {images.map(image => (
            <div key={image._id} style={{ marginRight: "0.5rem" }}>
              <CardMedia
                component="img"
                className={classes.media}
                image={image.url}
                title="Poll option"
              />

              <div style={{ marginLeft: "40%" }}>
                <Typography variant="subtitle2" style={{ fontSize: "1rem" }}>
                  <Favorite color="secondary" />
                  {image.castBy.length}
                </Typography>
              </div>
            </div>
          ))}
        </CardContent>
      </Link>
    </Card>
  );
};

export default PollCard;
