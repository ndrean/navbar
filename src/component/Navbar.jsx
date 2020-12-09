import React, { memo } from "react";
// import { observer } from "mobx-react-lite";

import history from "../utils/history";
import Link from "./Link.jsx";
import SgnButton from "./SgnButton.jsx";
import Hamburger from "./Hamburger";

const Navbar = memo(({ store }) => {
  // const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthCtx);

  const handleClick = (e) => {
    e.preventDefault();
    history.push({
      pathname: e.currentTarget.pathname,
    });

    // renderRoute(history.location);
  };

  return (
    <nav>
      <div className="logo">
        <i className="fas fa-mountain"></i>
        The Downwinder
      </div>
      <div className="signinout">
        <SgnButton store={store} />
      </div>

      <ul className="navlinks">
        <Link path={"/"} handler={handleClick}>
          Home
        </Link>
        <Link path={"/about"} handler={handleClick}>
          About
        </Link>
        <Link path={"/form"} handler={handleClick}>
          Form
        </Link>
        <Link path={"/contacts"} handler={handleClick}>
          Contacts
        </Link>
      </ul>

      <Hamburger />
    </nav>
  );
});

export default Navbar;
