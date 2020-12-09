import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

export default function FormInput({
  name,
  label,
  autocomplete,
  autofocus,
  isError,
  errorMessage,
  required,
  ...props
}) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      as={TextField}
      id={name}
      label={label}
      name={name}
      fullWidth
      autoComplete={autocomplete}
      autoFocus={autofocus}
      variant="outlined"
      margin="normal"
      InputLabelProps={{
        className: required ? "required-label" : "",
        required: required || false,
      }}
      error={isError}
      helperText={errorMessage}
    />
  );
}
