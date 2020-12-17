import React from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

import { Button, CssBaseline, TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "0vh",
    width: "Ovw",
  },
  paperForm: {
    margin: theme.spacing(1, 1),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    marginTop: "0px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const EditUser = observer(({ user }) => {
  const { paperForm, form, submit } = useStyles();

  const { first_name, last_name, email } = user;
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: email,
      firstName: first_name,
      lastName: last_name,
    },
    mode: "onTouched",
  });

  const onSubmit = async (data, e) => {
    console.log(data);
    //  e.target.reset();
  };

  if (isSubmitSuccessful) {
    console.log(`Welcome`);
  }

  return (
    <div className={paperForm}>
      <CssBaseline />
      <form className={form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputRef={register({
            required: { value: true, message: "Required" },
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid, should be my@email.com",
            },
          })}
          id="outlined-email-input"
          label="Email"
          margin="normal"
          fullWidth
          name="email"
          type="email"
          autoComplete="email"
          //  autoFocus
          required
          variant="outlined"
        />
        {errors.email && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            {errors.email.message}
          </p>
        )}
        <TextField
          inputRef={register({
            required: { value: true, message: "Required" },
            minLength: {
              value: 2,
              message: "First name should be at-least 2 characters.",
            },
          })}
          id="outlined-firstName-input"
          label="First Name"
          name="firstName"
          type="firstName"
          variant="outlined"
          autoComplete="current-firstName"
          margin="normal"
          fullWidth
        />
        {errors.firstName && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            {errors.firstName.message}
          </p>
        )}
        <TextField
          inputRef={register({
            required: { value: true, message: "Required" },
            minLength: {
              value: 2,
              message: "Last name should be at-least 2 characters.",
            },
          })}
          id="outlined-lastName-input"
          label="Last Name"
          name="lastName"
          type="lastName"
          variant="outlined"
          autoComplete="current-lastName"
          margin="normal"
          fullWidth
        />
        {errors.lasttName && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            {errors.lasttName.message}
          </p>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submit}
        >
          Save changes
        </Button>
      </form>
    </div>
  );
});

export default EditUser;
