import React from "react";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/core/styles";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // direction: "column",
    alignItems: "center",
    height: "50vh",
    width: "100vw",
    // overflow: "hidden",
    // backgroundColor: theme.palette.background.paper,
  },
  card: {
    flexBasis: "100%",
    maxWidth: "160px",
    textAlign: "center",
  },
  media: {
    height: 140,
  },
}));

const User = observer(({ store, email }) => {
  const classes = useStyles();
  let { first_name, last_name, avatar } = store.getUser(email);
  const fullName = first_name ? first_name + " " + last_name : email;

  return (
    <Grid container item xs={12} className={classes.root}>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography>{fullName}</Typography>
          {avatar && (
            <CardMedia
              className={classes.media}
              image={avatar}
              title={last_name}
              loading="lazy"
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
});

export default User;
