import React, { Suspense, lazy } from "react";
import UniversalRouter from "universal-router";
// or cdn <=> window.UniversalRouter

import store from "../utils/store";

import About from "./About";
import Contacts from "./Contacts";
import Home from "./Home";
import Form from "./Form";
import User from "./User";
import SignInForm from "./SignInForm";
const LazyLayout = lazy(() => import("./Layout"));

export default new UniversalRouter([
  {
    path: "",
    async action({ next }) {
      const component = await next();
      return (
        component && (
          <Suspense fallback={<span>Spinner</span>}>
            <LazyLayout store={store}>{component}</LazyLayout>;
          </Suspense>
        )
      );
    },
    children: [
      {
        path: "/",
        action: async () => {
          /*
          let home2 = await Promise.resolve(import("./Home2"));
          return home2({ store: store });
          */
          return <Home store={store} />;
        },
      },
      {
        path: "/about",
        async action() {
          return <About store={store} />;
        },
      },
      {
        path: "/signinform",
        async action() {
          return <SignInForm store={store} />;
        },
      },
      {
        path: "/form",
        async action() {
          return <Form store={store} />;
        },
      },
      {
        path: "/contacts",
        children: [
          {
            path: "",
            async action() {
              return <Contacts store={store} />;
            },
          },
          {
            path: "/:id",
            async action(context) {
              const idx = context.params.id;
              return <User idx={idx} store={store} />;
            },
          },
        ],
      },
    ],
  },
]);
