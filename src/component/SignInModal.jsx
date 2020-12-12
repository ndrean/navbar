// import React from "react";
import { action } from "mobx";

import { useForm } from "react-hook-form";

import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "0vh",
    width: "Ovw",
  },
  paperForm: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInModal = ({ store }) => {
  const { root, paperForm, form, submit } = useStyles();

  console.log("RHF -> Modal");
  const {
    register,
    handleSubmit,
    errors,
    // reset,
    // formState: { isSubmitting, isSubmitSuccessful },
  } = useForm({ mode: "onBlur" });

  const onSubmit = action(({ email, password }) => {
    const emails = Array.from(store.users, ({ email }) => email);
    if (!emails.includes(email)) {
      store.addUser({ email: email, name: password });
      store.toggleSgn();
      store.setMsg();
    }
    store.setModalClose();
  });

  return (
    <Grid
      container
      component="main"
      className={root}
      align="center"
      justify="center"
    >
      <CssBaseline />
      <Grid item xs={6} sm={6} md={5} component={Paper} elevation={6} square>
        <div className={paperForm}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

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
                  value: 6,
                  message: "Password should be at-least 6 characters.",
                },
              })}
              id="outlined-password-input"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              autoComplete="current-password"
              margin="normal"
              fullWidth
            />
            {errors.password && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                {errors.password.message}
              </p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInModal;