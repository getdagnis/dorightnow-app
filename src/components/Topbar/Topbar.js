import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Topbar.css";
import logo from "./logo.svg";

export const Topbar = () => {
  let [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const randomNumber = Math.ceil(Math.random() * 9);

    const combinedBodyClass = isDark
      ? "dark dark-bg" + randomNumber
      : "light light-bg" + randomNumber;

    document.body.classList = combinedBodyClass;
  });

  return (
    <div className="topbar">
      <div className="top-left">
        <Link to="/" className="logo-link">
          <img className="logo" src={logo} alt="Do Right Now logo" />
        </Link>
      </div>
      <div className="top-center"></div>
      <div className="top-right">
        <button
          className={!isDark ? "light-btn" : "dark-btn"}
          onClick={() => setIsDark(!isDark)}
        />
        <div className="burger-wrapper">
          <div className="hamburger"></div>
        </div>
      </div>
    </div>
  );
};
