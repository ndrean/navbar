import React, { memo } from "react";

const Link = memo(({ path, handler, children }) => {
  return (
    <li
      style={{
        border: "3px solid",
        padding: "5px",
        backgroundColor: "white",
        opacity: "0.5",
      }}
    >
      <a href={path} onClick={handler}>
        {children}
      </a>
    </li>
  );
});

export default Link;
