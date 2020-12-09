import React, { Suspense, lazy } from "react";
import UniversalRouter from "universal-router";
// or cdn <=> window.UniversalRouter

// import { action, observable } from "mobx";
// import { observer } from "mobx-react-lite";

import store from "../utils/store";
// import fetchUsers from "../utils/fetchUsers";

// import Layout from "./Layout";
import About from "./About";
import Contacts from "./Contacts";
import Home from "./Home";
import Form from "./Form";
import User from "./User";
const LazyLayout = lazy(() => import("./Layout"));

export default new UniversalRouter([
  {
    path: "",
    async action({ next }) {
      const component = await next();
      return (
        component && (
          <Suspense fallback={<span></span>}>
            <LazyLayout store={store}>{component}</LazyLayout>;
          </Suspense>
        )
      );
    },
    children: [
      {
        path: "/",
        action: async () => {
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

//   {
//     path: "/contacts",
//     children: [
//       {
//         path: "",
//         async action(context) {
//           // <- code splitting  with call API jsonplaceholder
//           const [Layout, Contacts] = await Promise.all([
//             import("./Layout"),
//             import("./Contacts"),
//             //   // store.users.length > 0 ? store.users : await fetchUsers(),
//           ]);

//           return (
//             <Layout store={context.store}>
//               <Contacts />
//             </Layout>
//           );
//         },
//       },
//       {
//         path: "/:id",
//         action: async (context) => {
//           const user = observer(store.getUserEmail(context.params.id));
//           const [Layout, User] = await Promise.all([
//             import("./Layout"),
//             import("./User"),
//           ]);
//           return (
//             <Suspense fallback={<span></span>}>
//               <Layout store={store}>
//
//               </Layout>
//             </Suspense>
//           );
//         },
//       },
//     ],
//   },
//
// ],
