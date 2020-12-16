import React from "react";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/core/styles";

// import { Image } from "cloudinary-react";

import EditUser from "./EditUser";

import { Grid, Card, CardContent, CardMedia, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // direction: "column",
    alignItems: "center",
    // height: "50vh",
    // width: "100vw",
    // overflow: "hidden",
    backgroundColor: theme.palette.background.default,
    padding: "1px",
  },
  card: {
    flexBasis: "100%",
    maxWidth: "160px",
    textAlign: "center",
    display: "flex",
    // justifyContent: "center",
    justifyContent: "space-around",
    direction: "column",
    paddingTop: "1px",
    paddingBottom: "5px",
  },
  media: {
    height: 140,
  },
}));

const defaultBoxprops = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1,
  style: { width: "8rem", height: "3rem", backgroundColor: "#424242" },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "10px",
};

const User = observer(({ store, email }) => {
  const classes = useStyles();
  const user = store.getUserByEmail(email);
  let { first_name, last_name, avatar } = user;
  const fullName = first_name ? first_name + " " + last_name : email;

  return (
    <Grid
      container
      item
      xs={12}
      className={classes.root}
      style={{ padding: "1px", marginTop: "5px" }}
    >
      <Card variant="outlined" className={classes.card} xs={12} sm={6}>
        <CardContent>
          <Box {...defaultBoxprops} borderRadius={16} border={2}>
            {fullName}
          </Box>
          {avatar && (
            <>
              <CardMedia
                className={classes.media}
                image={avatar}
                title={last_name}
                loading="lazy"
              />
              {/* <Image
                cloudName="dd4eq9e3c"
                publicId="sample"
                width="72"
                crop="scale"
              /> */}
            </>
          )}
        </CardContent>
      </Card>
      <EditUser user={user} store={store} item xs={12} sm={6} />
    </Grid>
  );
});

export default User;
