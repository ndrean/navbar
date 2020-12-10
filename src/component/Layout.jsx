import React, { Suspense, lazy } from "react";

// import { ThemeProvider } from "@material-ui/core/styles";
// import theme from "../utils/theme";
// import { StateProvider } from "../context/statectx";

import store from "../utils/store";
const LazyNavbar = lazy(() => import("./Navbar"));

const Layout = ({ children }) => {
  return (
    // <StateProvider>
    // <ThemeProvider theme={theme}>
    <Suspense fallback={<span>Loading...</span>}>
      <div className="back">
        <LazyNavbar store={store} />
        {children}
      </div>
    </Suspense>
    // </ThemeProvider>
    // </StateProvider>
  );
};

export default Layout;
