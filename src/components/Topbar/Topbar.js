import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Menu from "../Menu/Menu";
import "./Topbar.css";
import logo from "./logo.svg";

function Topbar() {
  let localDark =
    localStorage.getItem("isAppDark") === "true" || "false"
      ? JSON.parse(localStorage.getItem("isAppDark"))
      : true;
  let [isDark, setIsDark] = useState(localDark);
  let [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Picks a random background from an array based on a random number
    // Best backgrounds shown more often
    const randomNumber = Math.floor(Math.random() * 15);
    const randomArray = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8];
    const randomBackground = randomArray[randomNumber];
    const combinedBodyClass = isDark
      ? "dark dark-bg" + randomBackground
      : "light light-bg" + randomBackground;
    document.body.classList = combinedBodyClass;
    localDark = isDark;
    JSON.stringify(localStorage.setItem("isAppDark", isDark));
  }, [isDark]);

  useEffect(() => {
    console.log("menu open", menuOpen);
  }, [menuOpen]);

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
        <Menu
          handleClick={() => setMenuOpen(!menuOpen)}
          isOpen={menuOpen}
        ></Menu>
      </div>
    </nav>
  );
}

export default Topbar;
