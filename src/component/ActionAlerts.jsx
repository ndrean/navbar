import React from "react";
import { Alert } from "@material-ui/lab";
import { Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
      noWrap: "true",
      width: "100vw",
    },
  },
  root: {
    width: "100vw",
    backgroundColor: theme.palette.background.paper,
    noWrap: "true",
  },
}));

const ActionAlerts = ({ token }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  return (
    <div className={classes.alert}>
      <Collapse in={open}>
        <Alert
          onClose={() => {
            setOpen(false);
          }}
        >
          The token is {token.toString().substring(0, 40) + "..."}
        </Alert>
      </Collapse>
    </div>
  );
};

export default ActionAlerts;
