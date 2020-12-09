import React, { Suspense, lazy } from "react";

// import { StateProvider } from "../context/statectx";

// import Navbar from "./Navbar";
import store from "../utils/store";
const LazyNavbar = lazy(() => import("./Navbar"));

const Layout = ({ children }) => {
  return (
    // <StateProvider>
    <Suspense fallback={<span></span>}>
      <div className="back">
        <LazyNavbar store={store} />
        {children}
      </div>
    </Suspense>
    // </StateProvider>
  );
};
// return ({ children }) => React.createElement(observer(Wrapper), { children }); ???? Fred ???

export default Layout;
