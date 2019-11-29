import React, { useState, useEffect } from "react";
import {
  List,
  CircularProgress,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider
} from "@material-ui/core";
import moment from "moment";

const VoteList = ({ images }) => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialVoters = [];
    images.forEach(image =>
      image.castBy.forEach(voter => initialVoters.push(voter))
    );
    setVoters(initialVoters);
    setLoading(false);
  }, [images]);

  return loading ? (
    <CircularProgress />
  ) : !voters.length ? null : (
    <List>
      {voters.map(voter => (
        <React.Fragment key={voter._id}>
          <div style={{ display: "flex", margin: "1rem" }}>
            <ListItemAvatar>
              <Avatar alt={voter.user.name} src={voter.user.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={`${voter.user.name} voted`}
              secondary={moment(voter.date)
                .startOf("hour")
                .fromNow()}
            />

            <img
              style={{ width: "4rem", height: "4rem" }}
              src={voter.image.url}
              alt="Not found"
            />
          </div>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default VoteList;
