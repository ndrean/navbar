import * as React from "react";
import { action } from "mobx";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { makeStyles } from "@material-ui/core/styles";

import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#FFFFFF",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // color: theme.palette.secondary.light,
    // backgroundColor: "#fff",
    // theme.palette.primary.light,
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.light,
  },
  form: {
    width: "90%",
    marginTop: theme.spacing(1),
    // color: theme.palette.primary.main,
    // backgroundColor: "#fff",
    // theme.palette.primary.light,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // backgroundColor: theme.palette.secondary.dark,
  },
}));

export default function SignInForm({ store }) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    control,
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

  console.log("RHF -> render form");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            inputRef={register({
              required: { value: true, message: "Required" },
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid, should be my@email.com",
              },
            })}
            margin="normal"
            required
            fullWidth
            id="outlined-email-input"
            variant="outlined"
            // id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            // autoFocus
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
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="outlined-password"
            variant="outlined"
            autoComplete="current-password"
          />
          {errors.password && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {errors.password.message}
            </p>
          )}
          <FormControlLabel
            control={
              <Controller
                as={Checkbox}
                control={control}
                defaultValue={false}
                name="remember"
                color="primary"
                variant="contained"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
