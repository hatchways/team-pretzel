import React from "react";

const PollCard = ({ user }) => {
  return user.polls === null ? <h1>No Polls</h1> : <h1>Some Polls</h1>;
};

export default PollCard;
