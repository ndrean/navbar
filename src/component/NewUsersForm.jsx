import React, { useState } from "react";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import history from "../utils/history";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  IconButton,
  Container,
  Tooltip,
} from "@material-ui/core";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "90%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "#ba000d",
    fontWeight: "bold",
  },
  flex: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const NewUsersForm = observer(({ store }) => {
  const classes = useStyles();
  const newUser = { email: "", pwd: "" };
  const {
    register,
    handleSubmit,
    errors,
    reset,
    // formState: { isSubmitting },
  } = useForm({ mode: "onBlur" });

  const [newUsers, setNewUsers] = useState([newUser]);

  const addUser = () => {
    setNewUsers((prev) => [...prev, { ...newUser }]);
  };

  const rmUser = (i) => {
    console.log(i);
    setNewUsers((prev) => {
      console.log(prev, i);
      return prev.filter((_, id) => id !== i);
    });
  };

  const onSubmit = action((data) => {
    console.log(data.users);
    store.addUsers(data.users);
    history.push({ pathname: "/contacts" });
  });

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          onReset={reset}
        >
          <div
            className={classes.flex}
            style={{ flexWrap: "wrap", flexDirection: "row" }}
          >
            {newUsers.map((_, i) => (
              <div
                key={i}
                className={classes.flex}
                style={{ flexDirection: "column" }}
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
                  id={`email[${i}]`}
                  variant="outlined"
                  label="Email"
                  name={`users[${i}].email`}
                  autoComplete="email"
                />
                {
                  <p className={classes.error}>
                    {errors.users?.[i]?.email?.message}
                  </p>
                }
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
                  name={`users[${i}].password`}
                  label="Password"
                  type="password"
                  id={`password[${i}]`}
                  variant="outlined"
                />
                {
                  <p className={classes.error}>
                    {errors.users?.[i]?.password?.message}
                  </p>
                }
                <div className={classes.flex}>
                  <TextField
                    inputRef={register()}
                    margin="normal"
                    name={`users[${i}].image`}
                    label="Image"
                    type="file"
                    aceept="image/*"
                    id={`image[${i}]`}
                    variant="outlined"
                    autoComplete="current-image"
                  />
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="remove contact"
                      color="secondary"
                      onClick={() => rmUser(i)}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
          <div className={classes.flex}>
            <Button
              type="submit"
              className={classes.submit}
              variant="outlined"
              onClick={addUser}
              color="primary"
            >
              More users
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save users
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
});

export default NewUsersForm;
