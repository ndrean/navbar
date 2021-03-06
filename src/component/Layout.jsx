import React, { Suspense, lazy } from "react";

import Spinner from "./Spinner";
import { ThemeProvider } from "@material-ui/core/styles";
import darkTheme from "../utils/theme";
// import { StateProvider } from "../context/statectx";

const LazyNavbar = lazy(() => import("./Navbar"));

const Layout = ({ store, children }) => {
  return (
    // <StateProvider>
    <ThemeProvider theme={darkTheme}>
      <Suspense fallback={<Spinner />}>
        <div
          style={{
            backgroundColor: "#303030",
            width: "100vw",
            height: "100vh",
          }}
        >
          <LazyNavbar store={store} />
          {children}
        </div>
      </Suspense>
    </ThemeProvider>
    // </StateProvider>
  );
};

export default Layout;
