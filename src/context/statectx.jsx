import React, { createContext } from "react";

// import { Provider } from "mobx-react-lite";

import store from "../utils/store";

const StateContext = createContext();

function StateProvider(props) {
  // const [state, setState] = useState([], () => {});

  return (
    <StateContext.Provider value={{ store: store }}>
      {props.children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };
