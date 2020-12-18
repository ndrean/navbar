import { render } from "react-dom";
// import React from "react";
import UniversalRouter from "universal-router";
// or cdn <=> window.UniversalRouter: to test

import history from "./utils/history";
import { routes } from "./component/routes";
import store from "./utils/store";

import { configure } from "mobx";

import Error from "./component/Error";
// import { RedeemRounded } from "@material-ui/icons";

// <-  Mobx debug config
configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});
// -< Mobx debug config

const anchor = document.getElementById("root");

const context = {
  mode: "admin", //process.env.REACT_APP_MODE= "admin" in "routes.js"
  store,
};

const router = new UniversalRouter(routes, { context });

async function renderRoute(location) {
  try {
    const page = await router.resolve({ pathname: location.pathname });
    console.log(Object.keys(page));
    if (page.redirect) {
      return history.push({ pathname: page.redirect });
    }

    return render(page, anchor);
  } catch (err) {
    render(<Error />, anchor);
  }
}

function startApp() {
  history.push({ pathname: "/" });
  history.listen(({ location }) => renderRoute(location));
  renderRoute(history.location); // currentLocation = history.location
}

startApp();

/* 
Note1: check history.listen((res) => console.log(res));
 Nte2: to TEST
const comp = React.createElement(() => resolvedComp, {mode: "CTO"})
<- ReactDOM renders the "comp" but without the prop ... ??
*/
