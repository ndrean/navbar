// import React from "react"; // <- React 17
import { observer } from "mobx-react-lite";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";

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
      <br />
      <Container maxWidth="sm" className={classes.root}>
        <Typography
          component="h4"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
          style={{ margin: "5rem" }}
        >
          {store.setWelcome}
        </Typography>
        <br />
        <hr />
        <br />
        <Typography
          component="h6"
          variant="h6"
          align="center"
          color="textPrimary"
          gutterBottom
          style={{ marginTop: "2rem" }}
        >
          You can visit the tech stack at the page "About"
        </Typography>
      </Container>
    </div>
  );
});

export default Home;
