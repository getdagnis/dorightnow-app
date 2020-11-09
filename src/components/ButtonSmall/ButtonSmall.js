import React from "react";
import "./ButtonSmall.css";

const ButtonSmall = (props) => {
  const classList = "btn-small " + "btn-" + props.color;
  return (
    <div>
      <div className={classList}>{props.title}</div>
    </div>
  );
};

export default ButtonSmall;
