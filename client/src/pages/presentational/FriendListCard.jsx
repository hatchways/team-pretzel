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
    maxWidth: 275,
    marginRight: "1.5rem"
  },
  cardHeader: { borderBottom: "0.5px solid lightgrey" }
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
