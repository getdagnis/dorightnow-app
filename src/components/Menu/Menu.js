import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";

function Menu(props) {
  let { isOpen, handleClick } = props;

  const location = useLocation().pathname;
  console.log(location);

  return (
    <div className={isOpen ? "menu slideIn" : "menu slideOut"}>
      <ul onClick={handleClick}>
        {location !== "/" ? (
          <Link to="/">
            <li className="menu-list">Tasks Home</li>
          </Link>
        ) : null}
        {location !== "/following" ? (
          <Link to="/following">
            <li className="menu-list">Following</li>
          </Link>
        ) : null}
        {location !== "/settings" ? (
          <Link to="/settings">
            <li className="menu-list">Settings</li>
          </Link>
        ) : null}
        {location !== "/account" ? (
          <Link to="/account">
            <li className="menu-list">Account</li>
          </Link>
        ) : null}
        {location !== "/about" ? (
          <Link to="/about">
            <li className="menu-list">About</li>
          </Link>
        ) : null}
        {location !== "/contacts" ? (
          <Link to="/contacts">
            <li className="menu-list">Contacts</li>
          </Link>
        ) : null}
      </ul>
    </div>
  );
}

export default Menu;
