import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Topbar.css";
import logo from "./logo.svg";

export const Topbar = () => {
  let localDark =
    localStorage.getItem("isAppDark") === true || false
      ? JSON.parse(localStorage.getItem("isAppDark"))
      : true;
  let [isDark, setIsDark] = useState(localDark);

  useEffect(() => {
    // Picks a random background from an array. Best backgrounds (1, 2, 3, 4) shown more often.
    const randomNumber = Math.floor(Math.random() * 15);
    const randomArrary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 1, 1];
    const randomBackground = randomArrary[randomNumber];
    const combinedBodyClass = isDark
      ? "dark dark-bg" + randomBackground
      : "light light-bg" + randomBackground;
    console.log(randomNumber, combinedBodyClass);

    document.body.classList = combinedBodyClass;
    localDark = isDark;
    JSON.stringify(localStorage.setItem("isAppDark", isDark));
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
