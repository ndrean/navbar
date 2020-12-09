import React from "react";
import { observer } from "mobx-react-lite";

// import SignIn from "./SignIn";

const Home = observer(({ store }) => {
  // const SignIn = import("./SignIn");
  return (
    <>
      <div className="main">
        <h1 style={{ color: "white", fontWeight: "bold" }}>
          {store.setWelcome}
        </h1>
      </div>
      {/* <div>{store.showForm && <SignIn />}</div> */}
    </>
  );
});

export default Home;
