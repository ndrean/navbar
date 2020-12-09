import React from "react";
import { observer } from "mobx-react-lite";

const About = observer(({ store }) => {
  return (
    <div className="main">
      <h1 style={{ marginTop: "33%", marginBottom: "66%" }}>
        You visited this page {store.inc() + 1} time(s) and you have{" "}
        {store.nbUsers} contacts
      </h1>
    </div>
  );
});

export default About;
