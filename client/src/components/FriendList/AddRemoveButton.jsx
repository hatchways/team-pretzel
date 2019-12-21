import React, { useState } from "react";
import { Button } from "@material-ui/core";

const AddRemoveButton = ({ id, friendsToAdd, buttonClass }) => {
  const [buttonClick, setButtonClick] = useState(false);

  if (buttonClick) {
    return (
      <Button
        variant="contained"
        className={buttonClass}
        color="secondary"
        onClick={() => {
          const index = friendsToAdd.indexOf(id);
          if (index > -1) {
            friendsToAdd.splice(index, 1);
          }
          setButtonClick(!buttonClick);
        }}
      >
        REMOVE
      </Button>
    );
  } else {
    return (
      <Button
        variant="contained"
        className={buttonClass}
        color="primary"
        onClick={() => {
          friendsToAdd.push(id);
          setButtonClick(!buttonClick);
        }}
      >
        ADD
      </Button>
    );
  }
};

export default AddRemoveButton;
