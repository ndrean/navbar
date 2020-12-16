import React, { useState } from "react";
// import { observer } from "mobx-react-lite";
import { action } from "mobx";
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
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";

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

const NewUsersForm = ({ store }) => {
  const classes = useStyles();
  const newUser = { email: "", pwd: "" };
  const {
    register,
    handleSubmit,
    errors,
    reset,
    // formState: { isSubmitting },
  } = useForm({ mode: "onBlur" });

  const formRef = React.useRef(null);
  const [newUsers, setNewUsers] = useState([newUser]);

  const addUser = () => {
    setNewUsers((prev) => [...prev, { ...newUser }]);
  };

  const rmUser = (i) => {
    setNewUsers((prev) => {
      return prev.filter((_, id) => id !== i);
    });
  };

  const onSubmit = action((data) => {
    store.addUsers(data.users);
    const fData = new FormData(formRef.current);
    const pictures = [];
    for (const [k, v] of fData.entries()) {
      if (RegExp("image").test(k)) pictures.push(v);
    }

    /* just for this fake API */
    const userData = { email: "eve.holt@reqres.in", password: "cityslicka" };
    fetch("https://reqres.in/api/login", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(userData), // normaly, just pass "fData" AND no headers
      // !!!!!!!! no header when formdata !!!!!!!
      headers: new Headers({
        "Content-type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then(action((token) => store.setToken(token)));
    /* end fake api */

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
          ref={formRef}
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
                  <Tooltip title="Take a picture">
                    <label htmlFor={`image[${i}]`}>
                      <input
                        style={{ display: "none" }}
                        id={`image[${i}]`}
                        name={`users[${i}].image`}
                        type="file"
                        accept="image/*"
                        ref={register()}
                      />

                      <Avatar className={classes.avatar}>
                        <AddAPhotoOutlinedIcon />
                      </Avatar>
                      {/* <TextField
                        inputRef={register()}
                        margin="normal"
                        name={`users[${i}].image`}
                        label="Image"
                        type="file"
                        accept="image/*"
                        id={`image[${i}]`}
                        variant="outlined"
                        autoComplete="current-image"
                      /> */}
                    </label>
                  </Tooltip>

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
};

export default NewUsersForm;
