import React from "react";
import "./Menu.css";

function Menu(props) {
  return (
    <div className={props.isOpen ? "menu slideIn" : "menu slideOut"}>
      <ul>
        <li>Settings</li>
        <li>Account</li>
        <li>About</li>
        <li>Contacts</li>
      </ul>
    </div>
  );
}

export default Menu;
