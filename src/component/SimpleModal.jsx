import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import SignInModal from "./SignInModal.jsx";

function getModalStyle() {
  const top = 15;
  // const left = 5;

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
