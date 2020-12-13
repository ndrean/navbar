import React, { Suspense, lazy } from "react";

import Spinner from "./Spinner";
import { ThemeProvider } from "@material-ui/core/styles";
import darkTheme from "../utils/theme";
// import { StateProvider } from "../context/statectx";

import store from "../utils/store";
const LazyNavbar = lazy(() => import("./Navbar"));

const Layout = ({ children }) => {
  return (
    // <StateProvider>
    <ThemeProvider theme={darkTheme}>
      <Suspense fallback={<Spinner />}>
        <>
          <LazyNavbar store={store} />
          {children}
        </>
      </Suspense>
    </ThemeProvider>
    // </StateProvider>
  );
};

export default Layout;
