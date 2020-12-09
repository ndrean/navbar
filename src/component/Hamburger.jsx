import React from "react";
import "../App.css";

const Hamburger = () => {
  return (
    <div className="ham-toggle">
      <label htmlFor="ham-chkbox">
        <i className="fas fa-bars fa-lg">
          <input
            id="ham-chkbox"
            type="checkbox"
            hidden
            onClick={() => console.log("ok")}
          />
        </i>
      </label>
    </div>
  );
};

export default Hamburger;
