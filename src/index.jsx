import ReactDOM from "react-dom";

import history from "./utils/history";
import router from "./component/router";
// import "./App.css";
// import initFacebookSdk from "./utils/initFacebookSdk";

import { configure } from "mobx";
// import reportWebVitals from "./reportWebVitals";

import Error from "./component/Error";

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

const anchor = document.getElementById("root");

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

// initFacebookSdk().then(startApp);

function startApp() {
  history.listen(({ location }) => {
    renderRoute(location);
  });
  const currentLocation = history.location;
  renderRoute(currentLocation);
  // reportWebVitals(console.log);
}

startApp();
