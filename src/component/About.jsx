// import React from "react";
import { observer } from "mobx-react-lite";

import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Container,
  Link,
} from "@material-ui/core";

import imgReact from "../img/React.webp";
import imgMobx from "../img/Mobx.webp";
import imgMaterial from "../img/Material-ui.webp";
import imgRHF from "../img/RHF.webp";
import imgUR from "../img/Universal-Router.webp";

const useStyles = makeStyles((theme) => ({
  cardGrid: {},
  card: {},
  cardMedia: {
    height: "190px",
    with: "190px",
    padding: "5%",
    objectFit: "contain",
  },
  cardContent: { textAlign: "center" },
}));

const cards = [
  {
    name: "Univ-Router",
    image: imgUR,
    url: "https://www.kriasoft.com/universal-router/",
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
    name: "React",
    image: imgReact,
    url: "https://fr.reactjs.org/",
  },
];

const About = observer(({ store, info }) => {
  const classes = useStyles();

  console.log("info mode:", info);
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
          component="h3"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
          style={{ marginTop: "1rem" }}
        >
          The tech stack of this React app
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
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
                  <Typography gutterBottom variant="h4" component="h2">
                    <Link href={url} onClick={handleClick}>
                      {name}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
});

export default About;
