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

const FriendListCard = ({ title, friends }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title={title}
        subheader={`${friends.length} friends`}
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
