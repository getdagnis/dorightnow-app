import React from "react";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="wrapper">
      <div className="main-task">
        <h1 className="empty-h1">About Page</h1>
        <h3 className="empty-h3">
          <Link to="/">Go back to the home page!</Link>
        </h3>
      </div>
    </div>
  );
}

export default AboutPage;
