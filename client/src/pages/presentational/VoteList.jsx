import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, ListItem } from "@material-ui/core";

const VoteList = ({ images }) => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVoters(images);
    setLoading(false);
  }, [loading, images]);

  const getVoters = async images => {
    await images.forEach(async image => {
      const response = await axios.get(`/api/v1/vote/${image._id}`);
      console.log(response.data.voters);

      //console.log(listOfVoters);
    });
  };
  //console.log(voters);
  return loading ? (
    <h1>loading...</h1>
  ) : !voters ? (
    <h1>no voters</h1>
  ) : (
    <List>
      {voters.map(voter => (
        <h1>{voter.user.name}</h1>
      ))}
    </List>
  );
};

export default VoteList;
