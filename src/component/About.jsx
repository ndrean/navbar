import React from "react";
import { observer } from "mobx-react-lite";

import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Container,
  Link,
} from "@material-ui/core";

import imgReact from "../img/React.png";
import imgMobx from "../img/Mobx.jpeg";
import imgMaterial from "../img/Material-ui.png";
import imgRHF from "../img/RHF.png";
import imgUR from "../img/Universal-Router.png";

const useStyles = makeStyles((theme) => ({
  cardGrid: {},
  card: {},
  cardMedia: {
    // height: "200px",
    // with: "200px",
    padding: "5%",
    objectFit: "contain",
  },
  cardContent: { textAlign: "center" },
}));

const cards = [
  {
    name: "React",
    image: imgReact,
    url: "https://fr.reactjs.org/",
  },
  {
    name: "Mobx",
    image: imgMobx,
    url: "https://mobx.js.org/README.html",
  },
  {
    name: "Material-UI",
    image: imgMaterial,
    url: "https://material-ui.com/",
  },
  {
    name: "R-Hook-F.",
    image: imgRHF,
    url: "https://react-hook-form.com/",
  },
  {
    name: "Univ-Router",
    image: imgUR,
    url: "https://www.kriasoft.com/universal-router/",
  },
];

const About = observer(({ store }) => {
  const classes = useStyles();

  const handleClick = () => {};
  /* 
  From the Navbar, the function "store.inc()" is called before running this component
  so we get the update of "store.nb"
  */
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
          style={{ color: "#fff" }}
        >
          A React app
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          paragraph
          style={{ color: "#fff" }}
        >
          This page has been visited {store.nb} time(s) and you have{" "}
          {store.nbUsers} contact(s)
        </Typography>
      </Container>

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map(({ name, image, url }) => (
            <Grid item key={name} xs={6} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  className={classes.cardMedia}
                  image={image}
                  title={`tech: ${name}`}
                  loading="lazy"
                  // style={{ height: "200px", width: "200px" }}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={url} onClick={handleClick}>
                    {name}
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
});

export default About;
