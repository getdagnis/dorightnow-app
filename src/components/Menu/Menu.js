import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

function Menu(props) {
  let { isOpen } = props;
  return (
    <div className={isOpen ? "menu slideIn" : "menu slideOut"}>
      <ul>
        <Link to="settings">
          <li className="menu-list">Settings</li>
        </Link>
        <Link to="account">
          <li className="menu-list">Account</li>
        </Link>
        <Link to="about">
          <li className="menu-list">About</li>
        </Link>
        <Link to="contacts">
          <li className="menu-list">Contacts</li>
        </Link>
      </ul>
    </div>
  );
}

export default Menu;
