import React, { useEffect, Suspense } from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import fetchUsers from "../utils/fetchUsers";
import User from "./User";

const Contacts = observer(({ store }) => {
  useEffect(() => {
    const getUsers = async () => {
      return await fetchUsers();
    };
    getUsers().then(
      action((result) => {
        const emails = Array.from(store.users, ({ email }) => email);
        for (const user of result) {
          if (!emails.includes(user.email)) {
            store.addUser(user);
          }
        }
      })
    );
  }, [store]);

  return (
    <Suspense fallback={<span>Fetching...</span>}>
      <div className="main">
        {store.users &&
          store.users.map((user, idx) => (
            <User store={store} user={user} idx={idx} key={Math.random()} />
          ))}
      </div>
    </Suspense>
  );
});

export default Contacts;
