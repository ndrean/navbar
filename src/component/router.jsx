import React, { Suspense, lazy } from "react";
import UniversalRouter from "universal-router";

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

const routes = [
  {
    path: "",
    async action({ store, next }) {
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
        action: async ({ store }) => {
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
        async action({ store, mode }) {
          return (
            <Suspense fallback={spin()}>
              <LazyAbout store={store} info={mode} />;
            </Suspense>
          );
        },
      },
      {
        path: "/signinform",
        async action({ store }) {
          return (
            <Suspense fallback={spin()}>
              <LazySignInForm store={store} />;
            </Suspense>
          );
        },
      },
      {
        path: "/addusers",
        async action(context) {
          return (
            <Suspense fallback={spin()}>
              <LazyNewUsersForm store={context.store} />;
            </Suspense>
          );
        },
      },
      {
        path: "/contacts",
        children: [
          {
            path: "",
            // action from Universal Router
            async action({ store }) {
              fetchUsers().then(action((res) => store.addUsers(res))); //action from Mobx
              return (
                <Suspense fallback={spin()}>
                  <LazyContacts store={store} />;
                </Suspense>
              );
            },
          },
          {
            path: "/:email",
            async action({ store }, { email }) {
              // const email = context.params.email;
              return (
                <Suspense fallback={spin()}>
                  <LazyUser email={email} store={store} />;
                </Suspense>
              );
            },
          },
        ],
      },
    ],
  },
];

const context = {
  mode: "admin",
  store,
};

export default new UniversalRouter(routes, { context });
