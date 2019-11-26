import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import PollCard from "../presentational/PollCard";
import PollDialog from "../presentational/PollDialog";
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
    <>
      <div className={classes.header}>
        <Typography variant="h5">Polls ({polls.length})</Typography>
        <PollDialog user={user} polls={polls} addPoll={addPoll} />
      </div>
      <div className={classes.cardContainer}>
        {loading ? (
          <></>
        ) : !polls ? (
          <h1>No polls...</h1>
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
      </div>
    </>
  );
};

export default PollsContainer;
