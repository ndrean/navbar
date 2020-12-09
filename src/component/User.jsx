import { observer } from "mobx-react-lite";
import { action } from "mobx";
import React from "react";

import history from "../utils/history";

const User = observer(({ user, store, idx }) => {
  const path = `/contacts/${idx}`;

  const handleClick = (e) => {
    e.preventDefault();
    history.push({
      pathname: e.currentTarget.pathname,
    });
  };

  const email = user?.email ? user.email : store.getUserEmail(idx);

  return (
    <a href={path} onClick={action((e) => handleClick(e))}>
      <h3 style={{ margin: "5px", alignContent: "left" }}>{email}</h3>
    </a>
  );
});

export default User;
