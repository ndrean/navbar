import React, { Suspense, lazy } from "react";
import { action as mobxAction } from "mobx";
import history from "../utils/history";
import fetchUsers from "../utils/fetchUsers";

import Spinner from "./Spinner";
const spin = () => <Spinner />;

const LazyLayout = lazy(() => import("./Layout"));
const LazyHome = lazy(() => import("./Home"));
const LazyAbout = lazy(() => import("./About"));
const LazySignInForm = lazy(() => import("./SignInForm"));
const LazyNewUsersForm = lazy(() => import("./NewUsersForm"));
const LazyUser = lazy(() => import("./User"));
const LazyContacts = lazy(() => import("./Contacts"));

/* 
in "index.js", the Mobx store object is declared and passed to the 
"new UniversalRouter(routes, {context})"  via the object "context={store:store}"
Here is the skeleton of "routes" waiting for the context to be declared (or not)
*/

/*
export const routes = [
  {
    path: "/",
    action: async ({ store, mode }) => {
      return (
        <Suspense fallback={<Spinner />}>
          <LazyLayout store={store}>
            <LazyHome store={store} mode={mode} />;
          </LazyLayout>
        </Suspense>
      );
    },
  },
  {
    path: "/about",
    async action({ store }) {
      return (
        <Suspense fallback={spin()}>
          <LazyLayout store={store}>
            <LazyAbout store={store} />
          </LazyLayout>
        </Suspense>
      );
    },
  },
  {
    path: "/signinform",
    async action({ store }) {
      return (
        <Suspense fallback={spin()}>
          <LazyLayout store={store}>
            <LazySignInForm store={store} />
          </LazyLayout>
        </Suspense>
      );
    },
  },
  {
    path: "/addusers",
    async action({ store, mode }) {
      // if (mode !== process.env.REACT_APP_MODE) {
      if (mode !== "admin") {
        return { redirect: "/about" };
      }
      return (
        <Suspense fallback={spin()}>
          <LazyLayout store={store}>
            <LazyNewUsersForm store={store} />
          </LazyLayout>
        </Suspense>
      );
    },
  },
  {
    path: "/contacts",
    children: [
      {
        path: "",
        async action({ store }) {
          fetchUsers().then(mobxAction((res) => store.addUsers(res)));
          return (
            <Suspense fallback={spin()}>
              <LazyContacts store={store} />;
            </Suspense>
          );
        },
      },
      {
        path: "/:email",
        async action(context) {
          // <=> ({ store,mode }, { email }) instead of context
          // where "const email = context.params.email" // cf UR docs
          return (
            <Suspense fallback={spin()}>
              <LazyUser
                email={context.params.email}
                store={context.store}
                mode={context.mode}
              />
              ;
            </Suspense>
          );
        },
      },
    ],
  },
];
*/

export const routes = [
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
        action: async ({ store, mode }) => {
          return (
            <Suspense fallback={spin()}>
              <LazyHome store={store} mode={mode} />;
            </Suspense>
          );
        },
      },
      {
        path: "/about",
        async action({ store }) {
          return (
            <Suspense fallback={spin()}>
              <LazyAbout store={store} />;
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
        async action({ store, mode }) {
          if (mode !== process.env.REACT_APP_MODE) {
            // return { redirect: "/"} <- bug?
            return (
              <Suspense fallback={spin()}>
                <LazyHome store={store} mode={mode} />;
              </Suspense>
            );
          }
          return (
            <Suspense fallback={spin()}>
              <LazyNewUsersForm store={store} />
            </Suspense>
          );
        },
      },
      {
        path: "/contacts",
        children: [
          {
            path: "",
            async action({ store }) {
              fetchUsers().then(mobxAction((res) => store.addUsers(res)));
              return (
                <Suspense fallback={spin()}>
                  <LazyContacts store={store} />;
                </Suspense>
              );
            },
          },
          {
            path: "/:email",
            async action(context) {
              // <=> ({ store,mode }, { email }) instead of context
              // where "const email = context.params.email" // cf UR docs
              return (
                <Suspense fallback={spin()}>
                  <LazyUser
                    email={context.params.email}
                    store={context.store}
                    mode={context.mode}
                  />
                  ;
                </Suspense>
              );
            },
          },
        ],
      },
    ],
  },
];
