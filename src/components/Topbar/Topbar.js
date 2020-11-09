import React from "react";

import "./Topbar.css";
import logo from "./logo_small.svg";

export const Topbar = () => {
  return (
    <div className="topbar">
      <div className="top-left">
        <img className="logo" src={logo} alt="Do Right Now logo" />
      </div>
      <div className="top-center"></div>
      <div className="top-right">
        <div className="hamburger"></div>
      </div>
    </div>
  );
};
