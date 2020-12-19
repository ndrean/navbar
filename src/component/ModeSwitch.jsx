import React from "react";

import { Switch, FormControlLabel } from "@material-ui/core";
import store from "../utils/store";
import { action } from "mobx";

const ModeSwitch = () => {
  const [state, setState] = React.useState({
    checkedA: Boolean(window.localStorage.getItem("mode")),
  });

  const handleChange = action(() => {
    if (state.checkedA) {
      store.setMode("user");
    } else {
      store.setMode(process.env.REACT_APP_MODE);
    }
    setState({ ...state, checkedA: !state.checkedA });
    store.mode === "admin"
      ? window.localStorage.setItem("mode", "admin")
      : window.localStorage.setItem("mode", "user");
    console.log(store.mode);
  });

  console.log(state.checkedA, store.mode, window.localStorage.getItem("mode"));
  return (
    <FormControlLabel
      control={
        <Switch
          checked={state.checkedA}
          onClick={handleChange}
          name="checkedA"
          color="secondary"
        />
      }
      label="Admin mode"
    />
  );
};

export default ModeSwitch;
