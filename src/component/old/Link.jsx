// import React from "react";

const Link = ({ path, handler, children }) => {
  return (
    <li
      style={{
        border: "3px solid",
        padding: "5px",
        opacity: "0.1",
      }}
    >
      <a href={path} onClick={handler}>
        {children}
      </a>
    </li>
  );
};

export default Link;
