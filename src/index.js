import ReactDOM from "react-dom";

import UniversalRouter from "universal-router";

import history from "./utils/history";
import { routes } from "./component/router";

import store from "./utils/store";

// or cdn <=> window.UniversalRouter: to test
// import initFacebookSdk from "./utils/initFacebookSdk";

import { configure } from "mobx";

import Error from "./component/Error";

// Mobx debug
configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

//
const anchor = document.getElementById("root");

const context = {
  mode: "admin",
  store,
};

const router = new UniversalRouter(routes, { context });

async function renderRoute(location) {
  try {
    if (location === undefined) {
      return (location.pathname = "/");
    }
    const resolveComponent = await router.resolve({
      pathname: location.pathname,
    });
    return ReactDOM.render(resolveComponent, anchor);
  } catch (err) {
    console.log("Nothing there: ", location);
    return ReactDOM.render(<Error />, anchor);
  }
}

function startApp() {
  history.listen(({ location }) => renderRoute(location));
  renderRoute(history.location); // currentLocation = history.location
}

startApp();

/* Note: check history.listen((res) => console.log(res)); */
