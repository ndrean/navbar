import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import history from "../utils/history";

import {
  Grid,
  // Card,
  // CardContent,
  Typography,
  Avatar,
  // CardMedia,
  Paper,
  Link,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import fetchUsers from "../utils/fetchUsers";
// import User from "./User";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridList: {
    flexWrap: "wrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  media: {
    height: 140,
  },
}));

const Contacts = observer(({ store }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchUsers().then(
      action(async function storeUsers(result) {
        const emails = Array.from(store.users, ({ email }) => email);
        for (const user of result) {
          if (!emails.includes(user.email)) {
            store.addUser(user);
          }
        }
      })
    );
  }, [store]);

  const handleClick = (e) => {
    e.preventDefault();
    history.push({ pathname: e.currentTarget.pathname });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ margin: "50px" }}>
        {store.users &&
          store.users.map((user, idx) => (
            <Grid container key={user.email} spacing={1}>
              <Grid item xs={1}>
                {/* <Paper className={classes.paper}> */}
                <Avatar alt={user.last_name} src={user.avatar} loading="lazy" />
                {/* </Paper> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <Typography>
                    <Link
                      href={`/contacts/${user.email}`}
                      onClick={handleClick}
                    >
                      {user.email}
                    </Link>
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </div>
  );
});

export default Contacts;
