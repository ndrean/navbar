import React from "react";
// import Modal from "@material-ui/core/Modal";

import { action } from "mobx";
import { observer } from "mobx-react-lite";
import "../App.css";
import SimpleModal from "./SimpleModal";

// import store from "../utils/store";

const SgnButton = observer(({ store }) => {
  function handleClick() {
    store.toggleSgn();
    store.setMsg();
    // store.toggleForm();
    store.toggleModal();
  }

  return (
    <>
      <button className="btn-sign" onClick={action(() => handleClick())}>
        {store.setSignedIn} {store.open.toString()}
      </button>

      <SimpleModal
        open={store.open}
        handleClose={action(() => store.setModalClose())}
        store={store}
      />

      {/* <Modal
        style={{ backgroundColor: "white" }}
        open={store.open}
        onClose={store.setModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {<h1>hoho</h1>}
      </Modal> */}
    </>
  );
});

export default SgnButton;
