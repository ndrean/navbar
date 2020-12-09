import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
// import { action } from "mobx";
// import store from "../utils/store";
import fetchUsers from "../utils/fetchUsers";
import User from "./User";

const Contacts = observer(({ store }) => {
  const [users, setUsers] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      return await fetchUsers();
    };
    getUsers().then((res) => setUsers(res));
  }, []);

  const emails = Array.from(store.users, ({ email }) => email);
  for (const user of users) {
    if (!emails.includes(user.email)) {
      store.addUser(user);
    }
  }

  return (
    <div className="main">
      {store.users &&
        store.users.map((user, idx) => (
          <User store={store} user={user} idx={idx} key={Math.random()} />
        ))}
    </div>
  );
});

export default Contacts;
