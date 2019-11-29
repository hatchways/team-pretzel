import React from "react";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Container,
  makeStyles
} from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    height: "6rem"
  },
  image: {
    width: "4rem",
    height: "4rem"
  }
});

const VoteListItem = ({ name, avatar, imageUrl, timestamp }) => {
  const classes = useStyles();

  return (
    <>
      <Divider />
      <Container className={classes.container}>
        <ListItemAvatar>
          <Avatar alt={name} src={avatar} />
        </ListItemAvatar>

        <ListItemText
          primary={`${name} voted`}
          secondary={moment(timestamp).fromNow()}
        />

        <img className={classes.image} src={imageUrl} alt="Not found" />
      </Container>
      <Divider />
    </>
  );
};

export default VoteListItem;
