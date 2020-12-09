import React from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import {
  //   Controller,
  useForm,
  //   useFormContext,
  FormProvider,
} from "react-hook-form";

import FormInput from "./FormInputRHF";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "25vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
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

export default function SignInSide() {
  const { root, paper, form, submit } = useStyles();

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const { handleSubmit, errors } = methods;

  //   const { register, handleSubmit, errors, formState } = useForm({
  //     defaultValues: {
  //       email: "",
  //       password: "",
  //     },
  //     mode: "onTouched",
  //   });

  //   const { control } = useFormContext();

  //   console.log(control);

  const onSubmit = async (data, e) => {
    console.log(data, e.target);
    e.target = "";
  };

  //   if (methods.formState.isSubmitSuccessful) {
  //     window.alert(`to redirect`);
  //   }

  //   const emailValidations = {
  //     required: { value: true, message: "Required" },
  //     pattern: {
  //       value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
  //       message: "Email is not valid, should be my@email.com",
  //     },
  //   };

  console.log("render form");

  return (
    <>
      <Grid container component="main" className={root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <FormProvider {...methods}>
              <form
                className={form}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormInput
                  label="Email"
                  name="email"
                  autocomplete="email"
                  autofocus
                  required
                  isError={errors.email}
                  errorMessage={errors.message}
                />

                <FormInput
                  label="Password"
                  name="password"
                  autocomplet="current-password"
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
            </FormProvider>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
