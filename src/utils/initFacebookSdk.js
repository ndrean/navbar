// const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

export default function initFacebookSdk() {
  return new Promise((resolve) => {
    // wait for facebook sdk to initialize before starting the react app
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "150509900166677",
        cookie: true,
        xfbml: true,
        version: "v8.0",
      });
      window.FB.AppEvents.logPageView();
      // auto authenticate with the api if already logged in with facebook
      window.FB.getLoginStatus(({ authResponse }) => {
        statusChangeCallback(authResponse);
        if (authResponse) {
          console.log(authResponse);

          // accountService
          //    .apiAuthenticate(authResponse.accessToken)
          //    .then(resolve);
        } else {
          resolve();
        }
      });
    };

    function statusChangeCallback(response) {
      console.log(response);
      if (response.status === "connected") {
        console.log("logged in");
      } else {
        console.log("not logged in");
      }
    }

    // load facebook sdk script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
}
