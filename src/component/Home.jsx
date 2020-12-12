// import React from "react"; // <- React 17
import { observer } from "mobx-react-lite";

const Home = observer(({ store }) => {
  return (
    <>
      <div>
        <h1>{store.setWelcome}</h1>
      </div>
    </>
  );
});

export default Home;
