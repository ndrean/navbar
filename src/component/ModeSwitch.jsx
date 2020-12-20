import React, { useState, useEffect } from "react";
import { action } from "mobx";
import { Switch, FormControlLabel } from "@material-ui/core";
import store from "../utils/store";

const ModeSwitch = () => {
  // <- state needed for switch button
  const [state, setState] = useState({
    checkedA: Boolean(window.localStorage.getItem("mode")),
  }); // <- Boolean of anything not null or undefined or 0 is "true"

  const handleChange = action(async () => {
    if (state.checkedA) {
      store.setMode("");
    } else {
      store.setMode(process.env.REACT_APP_MODE);
    }
    setState({ ...state, checkedA: !state.checkedA });
  });

  useEffect(() => {
    let mode = "";
    state.checkedA ? (mode = "admin") : (mode = "");
    window.localStorage.setItem("mode", mode);
  }, [state]);

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
