import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, GridList } from "@material-ui/core";
import PollCard from "../Poll/PollCard";
import PollDialog from "../Poll/PollDialog";
import axios from "axios";

const PollsContainer = ({ classes, user }) => {
  const [polls, setPolls] = useState(user.polls);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPolls(user._id);
  }, [loading, user._id]);

  const getPolls = async id => {
    const response = await axios.get(`/api/v1/polls/user-polls/${id}`);
    setPolls(response.data.polls);
    setLoading(false);
  };

  const deletePoll = async id => {
    await axios.delete(`/api/v1/polls/${id}`);
    setLoading(true);
  };

  const addPoll = async formData => {
    await axios.post("/api/v1/polls", formData);
    setLoading(true);
  };

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h5">Polls ({polls.length})</Typography>
        <PollDialog user={user} polls={polls} addPoll={addPoll} />
      </div>
      <GridList className={classes.gridList}>
        {loading ? (
          <CircularProgress />
        ) : !polls.length ? (
          <Typography variant="h6">You haven't created a poll yet</Typography>
        ) : (
          polls.map(poll => (
            <PollCard
              key={poll._id}
              question={poll.question}
              images={poll.images}
              pollId={poll._id}
              isUser={user._id === poll.createdBy ? true : false}
              deletePoll={user._id === poll.createdBy ? deletePoll : null}
            />
          ))
        )}
      </GridList>
    </div>
  );
};

export default PollsContainer;
