import React, { useState } from "react";
// import FBIcon from "../utils/FBIcon";

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
          store.setCurrent({ email: response.email, pwd: fbToken });
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
        } else {
          setUser("");
          store.setCurrent({});
          store.isSignedIn = false;
          return window.FB.logout();
        }
      })
    );
  });

  return (
    <>
      <Button
        onClick={FBLogin}
        fullWidth
        variant="outlined"
        style={{
          backgroundColor: user && store.isSignedIn ? "#997b3b" : "#3b5999",
        }}
      >
        {user && store.isSignedIn
          ? `Welcome ${user.name}`
          : "Login with Facebook"}
      </Button>
    </>
  );
});

export default FBButton;
