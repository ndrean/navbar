import React, { Suspense, lazy } from "react";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
// import store from "../utils/store";

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
        // -> testing "static general props" passing with ctx & resolve
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
          // note: "info" is just a trial to see how data is passed via the context object
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
          if (mode === process.env.REACT_APP_MODE)
            return (
              <Suspense fallback={spin()}>
                <LazyNewUsersForm store={store} />;
              </Suspense>
            );
          else {
            // return { redirect: "/", from: context.pathname };
            return (
              <Suspense fallback={spin()}>
                <LazyHome store={store} />;
              </Suspense>
            );
          }
        },
      },
      {
        path: "/contacts",
        children: [
          {
            path: "",
            // the "action" below is from Universal Router
            async action({ store }) {
              fetchUsers() // the "action" below is from Mobx
                .then(action((res) => store.addUsers(res)));
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

// const context = {
//   mode: "admin", <- just a trial
//   store,
// };

// export default new UniversalRouter(routes, { context });
