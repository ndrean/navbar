import React from "react";

import { action } from "mobx";
import { observer } from "mobx-react-lite";

import { Button } from "@material-ui/core";

import "../App.css";
import SimpleModal from "./SimpleModal";

const SgnButton = observer(({ store }) => {
  function handleModalClick() {
    store.setMsg();
    if (store.isSignedIn) {
      // <-
      if (store.current.fb) {
        window.FB.logout();
      } //<-
      store.current = {};
      store.toggleSgn();
    } else {
      store.toggleModal();
    }
    // store.isSignedIn ? store.toggleSgn() : store.toggleModal();
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
