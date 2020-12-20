import React, { lazy, Suspense } from "react"; // <- React 17
import { observer } from "mobx-react-lite";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";

const LazyMode = lazy(() => import("./ModeSwitch"));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.secondary,
  },
}));

const Home = observer(({ store }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Suspense>
        <LazyMode />
      </Suspense>
      <br />
      <Container maxWidth="sm" className={classes.root}>
        <Typography
          component="h4"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
          style={{ margin: "2rem" }}
        >
          {store.setWelcome}
        </Typography>
        <Typography
          component="h6"
          variant="h6"
          align="center"
          color="textPrimary"
          gutterBottom
          style={{ margin: "1rem" }}
        >
          You can set the "admin" mode to enable contact creation
        </Typography>

        <Typography>{store.current.email}</Typography>

        <Typography
          component="h6"
          variant="h6"
          align="center"
          color="textPrimary"
          gutterBottom
          style={{ marginTop: "1rem" }}
        >
          You can visit the tech stack used at the page "About"
        </Typography>
      </Container>
    </div>
  );
});

export default Home;
