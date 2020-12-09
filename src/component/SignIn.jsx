import React, { useState } from "react";

// import { observer } from "mobx-react-lite";
import { action } from "mobx";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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

const SignIn = ({ store }) => {
  const { root, paperForm, form, submit } = useStyles();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const emails = Array.from(store.users, ({ email }) => email);
    if (!emails.includes(email)) {
      store.addUser({ email: email, name: pwd });
    }
  };

  console.log("render form");

  return (
    <>
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

            <form
              className={form}
              noValidate
              onSubmit={action((e) => handleSubmit(e))}
            >
              <TextField
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                // isError={errors.email}
                // errorMessage={errors.message}
              />

              <TextField
                id="outlined-password-input"
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                autoComplete="current-password"
                margin="normal"
                fullWidth
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />

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
    </>
  );
};

export default SignIn;
