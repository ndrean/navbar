import React, { Suspense, lazy } from "react";

import Spinner from "./Spinner";
// import { ThemeProvider } from "@material-ui/core/styles";
// import muitheme from "../utils/theme";
// import { StateProvider } from "../context/statectx";

import store from "../utils/store";
const LazyNavbar = lazy(() => import("./Navbar"));

const Layout = ({ children }) => {
  return (
    // <StateProvider>
    // <ThemeProvider theme={theme}>
    <Suspense fallback={<Spinner />}>
      <div className="back">
        {/* <div> */}
        <LazyNavbar store={store} />
        {children}
      </div>
    </Suspense>
    // </ThemeProvider>
    // </StateProvider>
  );
};

export default Layout;
