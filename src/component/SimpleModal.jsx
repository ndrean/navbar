import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
// import Dialog from "@material-ui/core/Dialog";

import SignInModal from "./SignInModal.jsx";

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  const top = 15; //15; //+ rand();
  // const left = 5; //+ rand();

  return {
    top: `${top}%`,
    margin: "auto",
    // left: `${left}%`,
    // transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 700,
  },
}));

const SimpleModal = ({ open, handleClose, store }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <SignInModal store={store} />
    </div>
  );

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default SimpleModal;
