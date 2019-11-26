import React from "react";
import { ListItem } from "@material-ui/core";

const VoterList = ({ listOfVoters }) => {
  console.log(listOfVoters);
  //console.log(imageUrl);
  return (
    <>
      <h1>hello</h1>
      {/* <ListItem key={voter._id}>{voter.name}</ListItem> */}
      {/* <ListItem>{imageUrl}</ListItem> */}
      {listOfVoters.forEach(element => {
        element.voters.map(voter => <ListItem>{voter.name}</ListItem>);
      })}
    </>
  );
};

export default VoterList;
