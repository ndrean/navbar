import React from "react";
// import Modal from "@material-ui/core/Modal";

import { action } from "mobx";
import { observer } from "mobx-react-lite";

import "../App.css";
import SimpleModal from "./SimpleModal";

const SgnButton = observer(({ store }) => {
  function handleModalClick() {
    store.setMsg();
    store.isSignedIn ? store.toggleSgn() : store.toggleModal();
  }

  return (
    <>
      <button className="btn-sign" onClick={action(() => handleModalClick())}>
        {store.setSignedIn}
      </button>

      <SimpleModal
        open={store.open}
        handleClose={action(() => store.setModalClose())}
        store={store}
      />
    </>
  );
});

export default SgnButton;
