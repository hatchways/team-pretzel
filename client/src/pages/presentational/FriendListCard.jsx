import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Container
} from "@material-ui/core";
import Friend from "./Friend";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 300
  },
  cardHeader: { borderBottom: "0.5px solid lightgrey" },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const friends = [
  { id: 1, name: "leon", avatar: "#" },
  { id: 2, name: "kay", avatar: "#" },
  { id: 3, name: "sunny", avatar: "#" }
];

const FriendListCard = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title="Title"
        subheader="This is the subheader"
      />
      <CardContent>
        <Container>
          <Friend friends={friends} />
        </Container>
      </CardContent>
    </Card>
  );
};

export default FriendListCard;
