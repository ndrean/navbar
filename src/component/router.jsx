import React, { Suspense, lazy } from "react";
import UniversalRouter from "universal-router";
// or cdn <=> window.UniversalRouter

import { action } from "mobx";
import fetchUsers from "../utils/fetchUsers";
import store from "../utils/store";

import Spinner from "./Spinner";
const spin = () => <Spinner />;

const LazyLayout = lazy(() => import("./Layout"));
const LazyHome = lazy(() => import("./Home"));
const LazyAbout = lazy(() => import("./About"));
const LazySignInForm = lazy(() => import("./SignInForm"));
const LazyNewUsersForm = lazy(() => import("./NewUsersForm"));
const LazyUser = lazy(() => import("./User"));
const LazyContacts = lazy(() => import("./Contacts"));

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
          return (
            <Suspense fallback={spin()}>
              <LazyHome store={store} />;
            </Suspense>
          );
        },
      },
      {
        path: "/about",
        async action() {
          return (
            <Suspense fallback={spin()}>
              <LazyAbout store={store} />;
            </Suspense>
          );
          //  <About store={store} />;
        },
      },
      {
        path: "/signinform",
        async action() {
          return (
            <Suspense fallback={spin()}>
              <LazySignInForm store={store} />;
            </Suspense>
          );
          // <SignInForm store={store} />;
        },
      },
      {
        path: "/addusers",
        async action() {
          return (
            <Suspense fallback={spin()}>
              <LazyNewUsersForm store={store} />;
            </Suspense>
          );
          // <NewUsersForm store={store} />;
        },
      },
      {
        path: "/contacts",
        children: [
          {
            path: "",
            // action from Universal Router
            async action() {
              fetchUsers().then(action((res) => store.addUsers(res))); //action from Mobx
              return (
                <Suspense fallback={spin()}>
                  <LazyContacts store={store} />;
                </Suspense>
              );
              //  <Contacts store={store} />;
            },
          },
          {
            path: "/:email",
            async action(context) {
              const email = context.params.email;
              return (
                <Suspense fallback={spin()}>
                  <LazyUser email={email} store={store} />;
                </Suspense>
              );
              //  <User email={email} store={store} />;
            },
          },
        ],
      },
    ],
  },
]);
