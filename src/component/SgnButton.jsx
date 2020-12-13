import React from "react";
// import Modal from "@material-ui/core/Modal";

import { action } from "mobx";
import { observer } from "mobx-react-lite";

import { Button } from "@material-ui/core";

import "../App.css";
import SimpleModal from "./SimpleModal";

const SgnButton = observer(({ store }) => {
  function handleModalClick() {
    store.setMsg();
    if (store.isSignedIn) store.rmCurrent(store.current);
    store.isSignedIn ? store.toggleSgn() : store.toggleModal();
  }

  return (
    <>
      <Button onClick={action(() => handleModalClick())}>
        {store.setSignedIn}
      </Button>

      <SimpleModal
        open={store.open}
        handleClose={action(() => store.setModalClose())}
        store={store}
      />
    </>
  );
});

export default SgnButton;
