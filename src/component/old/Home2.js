import React, { createElement as e } from "react";
import { observer } from "mobx-react-lite";

// import SignIn from "./SignIn";

const Home2 = ({ store }) => {
  const SignIn = import("./SignIn");
  const Home2 = ({ store }) => (
    <>
      <div className="main">
        <h1 style={{ color: "white", fontWeight: "bold" }}>{store.welcome}</h1>
      </div>
      <div>{store.showForm && <SignIn />}</div>
    </>
  );

  return () => e(observer(Home2({ store: store }), null));
};

export default Home2;
