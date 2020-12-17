import React, { useState } from "react";
// import FBIcon from "../utils/FBIcon";
// import history from "../utils/history";

import { Button } from "@material-ui/core";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import store from "../utils/store";

const FBButton = observer(() => {
  const [user, setUser] = useState("");

  const statusCallback = async (response) => {
    const fbToken = response.authResponse.accessToken;
    if (response.status !== "connected") {
      console.log("not logged in");
      return;
    }
    if (response.status === "connected") {
      return window.FB.api(
        "/me",
        { fields: "name, email" },
        action(function (response) {
          setUser({ name: response.name, email: response.email });
          store.setCurrent({
            name: response.name,
            email: response.email,
            pwd: fbToken,
            signed: true,
            fb: true,
          });
          store.toggleSgn();
        })
      );
    }
  };

  const FBLogin = action(async () => {
    window.FB.getLoginStatus(
      action(async (response) => {
        if (!response.authResponse) {
          window.FB.login(
            (response) => {
              statusCallback(response);
            },
            { scope: "email" }
          );
          // history.push({ pathname: "/" });
        } else {
          return window.FB.api(
            "/me",
            { fields: "name, email" },
            action(function (response) {
              setUser({ name: response.name, email: response.email });
              store.setCurrent({
                name: response.name,
                email: response.email,
                pwd: response.authResponse.accessToken,
                signed: true,
                fb: true,
              });
              store.toggleSgn();
            })
          );
          // setUser("");
          // store.setCurrent({});
          // store.isSignedIn = false;
          // return window.FB.logout();
        }
      })
    );
  });

  return (
    <>
      <Button
        onClick={FBLogin}
        fullWidth
        disabled={store.current.signed}
        variant="outlined"
        style={{
          backgroundColor: store.current.signed ? "#997b3b" : "#3b5999",
        }}
      >
        {store.current.signed
          ? `Welcome ${store.current.name}`
          : "Login with Facebook"}
      </Button>
    </>
  );
});

export default FBButton;
