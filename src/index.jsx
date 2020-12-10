import ReactDOM from "react-dom";

import history from "./utils/history";
import router from "./component/router";
import "./App.css";
import Layout from "./component/Layout";
// import initFacebookSdk from "./utils/initFacebookSdk";

import { configure } from "mobx";
// import reportWebVitals from "./reportWebVitals";

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
    return ReactDOM.render(
      <Layout>
        <h1>
          <a href="Errare humanum est, perseverare diabolicum — Wikipédia">
            Errare humanum est, perseverare diabolicum — Wikipédia
          </a>
        </h1>
      </Layout>,
      anchor
    );
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
