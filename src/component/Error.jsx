import React, { lazy, Suspense } from "react";

import img404 from "../img/404.jpg";
import Spinner from "./Spinner";
const LazyLayout = lazy(() => import("./Layout"));

export default function Error() {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyLayout>
        <img
          src={img404}
          alt="error 404"
          style={{ height: "100vh", width: "100vw" }}
          loading="lazy"
        />
      </LazyLayout>
    </Suspense>
  );
}
