import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: "2rem",
    "& .Mui-focused": {
      color: theme.primary
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.primary
    }
  }
}));

const FormFields = ({ label, error, type, name, value, onChange, errors }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink={true}>{label}</InputLabel>
      <Input
        error={error}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errors ? <FormHelperText error>{errors}</FormHelperText> : null}
    </FormControl>
  );
};

export default FormFields;
