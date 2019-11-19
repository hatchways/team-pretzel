import React from "react";
import { makeStyles, Card, CardContent, CardHeader } from "@material-ui/core";

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

const PollCard = ({ poll }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title={poll.question}
        subheader="20 answers"
      />
      <CardContent className={classes.cardContent}>
        <div style={{ marginRight: "0.5rem" }}>
          <img className={classes.images} src={poll.images[0]} alt="vote 1" />
        </div>
        <div style={{ marginLeft: "0.5rem" }}>
          <img className={classes.images} src={poll.images[1]} alt="vote 2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PollCard;
