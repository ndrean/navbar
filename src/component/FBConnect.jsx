import React from "react";

import FBButton from "./FBButton";

export default function FBConnect() {
  React.useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "150509900166677",
        cookie: true,
        xfbml: true,
        version: "v9.0",
      });

      window.FB.AppEvents.logPageView();
    };

    ((d, s, id) => {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return <FBButton />;
}
