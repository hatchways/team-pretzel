import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Button } from "@material-ui/core";
//import {Fab} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    display: "flex",
    alignItems: "flex-end"
  },
  title: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: 100
  },
  input: {
    display: "none"
  },
  toolbar: {
    display: "flex",
    alignContent: "flex-end"
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar className="classes.toolbar">
        <Link to="#" className={classes.menuButton}>
          <Button>Friends</Button>
        </Link>
        <Link to="#" className={classes.menuButton}>
          <Button>Friends poll</Button>
        </Link>
        <Link to="#" className={classes.menuButton}>
          <Button>Opinions</Button>
        </Link>
        <Link to="#" className={classes.menuButton}>
          <Button variant="outlined" size="small" className={classes.button}>
            Create Poll
          </Button>
        </Link>
      </Toolbar>
    </div>
  );
};

export default Navbar;
