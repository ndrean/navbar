import { render } from "react-dom";
// import React from "react";
import UniversalRouter from "universal-router";

import history from "./utils/history";
import { routes } from "./component/router";

import store from "./utils/store";

// or cdn <=> window.UniversalRouter: to test
// import initFacebookSdk from "./utils/initFacebookSdk";

import { configure } from "mobx";

import Error from "./component/Error";
import { RedeemRounded } from "@material-ui/icons";

// Mobx debug
configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

const anchor = document.getElementById("root");

const context = {
  user: "me", // <- TESTING props
  mode: "no admin", //process.env.REACT_APP_MODE= "admin" in "routes.js"
  store,
};

const router = new UniversalRouter(routes, { context });

function renderRoute(location) {
  return router
    .resolve({ pathname: location.pathname })
    .then((page) => {
      if (page.redirect) {
        return history.push({ pathname: page.redirect });
      } else {
        return render(page, anchor);
      }
    })
    .catch((err) => {
      render(<Error />, anchor);
    });
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

/*
async function renderRoute(location) {
  try {
    if (location === undefined) {
      return (location.pathname = "/");
    }
    const page = await router.resolve({
      pathname: location.pathname,
      // mode: "CCO", //<- overwrites the context
    });

    if (page.redirect) {
      console.log("history redir");
      history.push({ pathname: page.redirect });
    } else {
      console.log("hist normal", location.pathname);
      return render(page, anchor);
    }
  } catch (err) {
    console.log("Nothing there: ", location);
    return render(<Error />, anchor);
  }
}
*/
