import React from "react";
import { Link } from "react-router-dom";

function SettingsPage() {
  return (
    <div className="wrapper">
      <div className="settings-main">
        <h1 className="empty-h1">Settings</h1>
        <h3 className="empty-h3">
          Nothing here yet. <Link to="/">Go back to the home page!</Link>
        </h3>
      </div>
    </div>
  );
}

export default SettingsPage;
