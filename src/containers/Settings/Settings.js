import React from "react";
import { Link } from "react-router-dom";
import css from "./Settings.css";

function SettingsPage() {
  return (
    <div className="wrapper">
      <div className="settings-main">
        <h1 className="empty-h1">Settings</h1>
        <h3 className="empty-h3">
          Your personal settings (stored only on this browser)
        </h3>

        <ul>
          <li>
            Require a double click to show/hide sides in the tasks page{" "}
            <input
              className={css.checkbox}
              type="checkbox"
              name="showhide_dblclick"
              id="showhide_dblclick"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsPage;
