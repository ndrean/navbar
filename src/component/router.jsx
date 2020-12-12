import React, { Suspense, lazy } from "react";
import UniversalRouter from "universal-router";
// or cdn <=> window.UniversalRouter

import store from "../utils/store";

import Spinner from "./Spinner";
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
          <Suspense fallback={<Spinner />}>
            <LazyLayout store={store}>{component}</LazyLayout>
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
            path: "/:email",
            async action(context) {
              const email = context.params.email;
              return <User email={email} store={store} />;
            },
          },
        ],
      },
    ],
  },
]);
