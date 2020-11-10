import React, { useEffect, useState } from "react";

import "./Topbar.css";
import logo from "./logo.svg";

export const Topbar = () => {
  let [isDark, setIsDark] = useState(true);

  useEffect(() => {
    isDark
      ? (document.body.classList = "dark")
      : (document.body.classList = "light");
  });

  return (
    <div className="topbar">
      <div className="top-left">
        <img className="logo" src={logo} alt="Do Right Now logo" />
      </div>
      <div className="top-center"></div>
      <div className="top-right">
        <button className="dark-light" onClick={() => setIsDark(!isDark)} />
        <div className="burger-wrapper">
          <div className="hamburger"></div>
        </div>
      </div>
    </div>
  );
};
