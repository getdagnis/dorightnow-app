import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Menu from "../Menu/Menu";
import "./Topbar.css";
import logo from "./logo.svg";

const Topbar = () => {
  let localDark =
    localStorage.getItem("isAppDark") === "true" || "false"
      ? JSON.parse(localStorage.getItem("isAppDark"))
      : true;
  let [isDark, setIsDark] = useState(localDark);
  let [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Picks a random background from an array based on a random number.
    const randomNumber = Math.floor(Math.random() * 15);
    //  Best backgrounds (1, 1, 1, 1, 2, 2, 2, 3, 4) shown more often.
    const randomArray = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8];
    const randomBackground = randomArray[randomNumber];
    const combinedBodyClass = isDark
      ? "dark dark-bg" + randomBackground
      : "light light-bg" + randomBackground;
    console.log(randomNumber, combinedBodyClass);
    document.body.classList = combinedBodyClass;
    localDark = isDark;
    JSON.stringify(localStorage.setItem("isAppDark", isDark));
  }, [isDark]);

  useEffect(() => {
    console.log(menuOpen ? "menu open" : "menu closed");
  });

  return (
    <nav className="topbar">
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
        <div onClick={() => setMenuOpen(!menuOpen)} className="burger-wrapper">
          <div className="hamburger"></div>
        </div>
        <Menu isOpen={menuOpen} />
      </div>
    </nav>
  );
};

export default Topbar;
