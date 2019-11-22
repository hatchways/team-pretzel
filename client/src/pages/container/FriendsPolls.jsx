import React from "react";
import useGet from "../../utils/hooks/useGet";

const FriendsPolls = props => {
  const userId = props.location.state.user;
  const polls = useGet("/api/v1/users/profile/polls", "polls");
  console.log(polls);
  return <h1>this is friends polls</h1>;
};

export default FriendsPolls;
