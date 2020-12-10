import React, { Suspense } from "react";
import { observer } from "mobx-react-lite";

const About = observer(({ store }) => {
  /*  !! need to wrap "store.inc" inside "useEffect" otherwise BUG below
  "Cannot update a component (`wrappedComponent`) while rendering ..."
  */

  // useEffect(() => {
  //   store.inc();
  // }, []);

  return (
    <Suspense fallback={<span></span>}>
      <div className="main">
        <h1 style={{ marginTop: "33%", marginBottom: "66%" }}>
          This page has been visited {store.nb} times and you have{" "}
          {store.nbUsers} contacts
        </h1>
      </div>
    </Suspense>
  );
});

export default About;
