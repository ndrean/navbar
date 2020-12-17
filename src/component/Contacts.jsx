import React, { useEffect, lazy, Suspense } from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import history from "../utils/history";

import {
  List,
  ListItem,
  Box,
  ListItemIcon,
  Avatar,
  Link,
  // Collapse,
} from "@material-ui/core";

// import { Alert } from "@material-ui/lab";

import { makeStyles } from "@material-ui/core/styles";

// import fetchUsers from "../utils/fetchUsers";

const LazyAlert = lazy(() => import("./ActionAlerts"));

const useStyles = makeStyles((theme) => ({
  /*alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },*/
  root: {
    width: "100vw",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    // padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    direction: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px 0px 0px 15px",
  },
  listItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const defaultBoxprops = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1,
  style: {
    padding: "1rem",
    height: "3rem",
    backgroundColor: "#424242",
    width: "16rem",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "10px",
};

/*
const ActionAlerts = ({ token }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          onClose={() => {
            setOpen(false);
          }}
        >
          New user created! The token is {token}
        </Alert>
      </Collapse>
    </div>
  );
};
*/
const Contacts = observer(({ store }) => {
  const classes = useStyles();

  useEffect(() => {
    // fetchUsers().then(
    action(async (result) => {
      const emails = Array.from(store.users, ({ email }) => email);
      for (const user of result) {
        if (!emails.includes(user.email)) {
          store.addUser(user);
        }
      }
    });
    // );
  }, [store]);

  const handleClick = (e) => {
    e.preventDefault();
    history.push({ pathname: e.currentTarget.pathname });
  };

  return (
    <>
      <div>
        {store.token && (
          <Suspense>
            <LazyAlert token={store.token} />
          </Suspense>
        )}
      </div>
      <div className={classes.root}>
        {store.users &&
          store.users.map((user, idx) => (
            <List key={user.email} spacing={2} className={classes.paper}>
              <ListItemIcon xs={2} className={classes.listItem}>
                <Avatar alt={user.last_name} src={user.avatar} loading="lazy" />
              </ListItemIcon>

              <ListItem
                xs={8}
                className={classes.listItem}
                style={{ width: "16rem" }}
              >
                <Box {...defaultBoxprops} borderRadius={16} border={2}>
                  <Link
                    href={`/contacts/${user.email}`}
                    onClick={handleClick}
                    style={{ color: "#fff" }}
                  >
                    {user.email}
                  </Link>
                </Box>
              </ListItem>
            </List>
          ))}
      </div>
    </>
  );
});

export default Contacts;
