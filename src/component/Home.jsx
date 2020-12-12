import React from "react";
import { observer } from "mobx-react-lite";

const Home = observer(({ store }) => {
  return (
    <>
      <div>
        <h1 style={{ color: "white", fontWeight: "bold" }}>
          {store.setWelcome}
        </h1>
      </div>
    </>
  );
});

export default Home;
