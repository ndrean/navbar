(this.webpackJsonpnavbar=this.webpackJsonpnavbar||[]).push([[5],{212:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return m}));var a=t(0),r=t(1),c=t.n(r),i=t(197),o=t(2),s=t.n(o),u=t(4),l=t(42),d=t(3),b=t(82),f=t(13),p=Object(b.a)((function(){var e=Object(r.useState)(""),n=Object(l.a)(e,2),t=n[0],c=n[1],o=function(){var e=Object(u.a)(s.a.mark((function e(n){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.authResponse.accessToken,"connected"===n.status){e.next=4;break}return console.log("not logged in"),e.abrupt("return");case 4:if("connected"!==n.status){e.next=6;break}return e.abrupt("return",window.FB.api("/me",{fields:"name, email"},Object(d.b)((function(e){c({name:e.name,email:e.email}),f.a.setCurrent({name:e.name,email:e.email,pwd:a,signed:!0,fb:!0}),f.a.toggleSgn(),console.log(t)}))));case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),b=Object(d.b)(Object(u.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.FB.getLoginStatus(Object(d.b)(function(){var e=Object(u.a)(s.a.mark((function e(n){var t,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=null===n||void 0===n||null===(t=n.authResponse)||void 0===t?void 0:t.accesToken,n.authResponse){e.next=5;break}window.FB.login((function(e){o(e)}),{scope:"email"}),e.next=6;break;case 5:return e.abrupt("return",window.FB.api("/me",{fields:"name, email"},Object(d.b)((function(e){c({name:e.name,email:e.email}),f.a.setCurrent({name:e.name,email:e.email,pwd:a,signed:!0,fb:!0}),f.a.toggleSgn()}))));case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)}))));return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(i.a,{onClick:b,fullWidth:!0,disabled:f.a.current.signed,variant:"outlined",style:{backgroundColor:f.a.current.signed?"#997b3b":"#3b5999"},children:f.a.current.signed?"Welcome ".concat(f.a.current.name):"Login with Facebook"})})}));function m(){return c.a.useEffect((function(){window.fbAsyncInit=function(){window.FB.init({appId:"150509900166677",cookie:!0,xfbml:!0,version:"v9.0"}),window.FB.AppEvents.logPageView()},function(e,n,t){var a,r=e.getElementsByTagName(n)[0];e.getElementById(t)||((a=e.createElement(n)).id=t,a.src="https://connect.facebook.net/en_US/sdk.js",r.parentNode.insertBefore(a,r))}(document,"script","facebook-jssdk")}),[]),Object(a.jsx)(p,{})}}}]);
//# sourceMappingURL=5.c1a4980c.chunk.js.map