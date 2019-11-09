import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from "@material-ui/core";

const styles = {
  formControl: { marginBottom: "1rem" }
};

const FormFields = ({ label, error, type, name, value, onChange, errors }) => {
  return (
    <FormControl style={styles.formControl}>
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
