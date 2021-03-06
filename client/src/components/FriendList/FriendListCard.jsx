import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Container,
  ListItem
} from "@material-ui/core";
import Friend from "../Friends/Friend";
import DeleteDialog from "../Common/DeleteDialog";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 275,
    marginRight: "1.5rem"
  },
  cardHeader: { borderBottom: "0.5px solid lightgrey" }
});

const FriendListCard = ({
  title,
  friends,
  id,
  deleteFriendList,
  isUser = false
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      {isUser ? (
        <DeleteDialog title={title} deleteFunction={deleteFriendList} id={id} />
      ) : null}
      <CardHeader
        className={classes.cardHeader}
        title={title}
        subheader={`${friends.length} friends`}
      ></CardHeader>
      <CardContent>
        <Container>
          {friends.map(friend => (
            <ListItem key={friend._id}>
              <Friend friend={friend} />
            </ListItem>
          ))}
        </Container>
      </CardContent>
    </Card>
  );
};

export default FriendListCard;
