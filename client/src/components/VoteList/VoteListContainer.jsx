import React, { useState, useEffect } from "react";
import { List, CircularProgress } from "@material-ui/core";
import axios from "axios";
import VoteListItem from "./VoteListItem";

const VoteListContainer = ({ pollId }) => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    votes(pollId);
    setLoading(false);
  }, [pollId, loading]);

  const votes = async pollId => {
    const response = await axios.get(`/api/v1/vote/votes/${pollId}`);
    setVoters(response.data.votes);
  };

  return loading ? (
    <CircularProgress />
  ) : !voters.length ? null : (
    <List>
      {voters.map(voter => (
        <VoteListItem
          key={voter._id}
          name={voter.user.name}
          avatar={voter.user.avatar}
          imageUrl={voter.image.url}
          timestamp={voter.timestamp}
        />
      ))}
    </List>
  );
};

export default VoteListContainer;
