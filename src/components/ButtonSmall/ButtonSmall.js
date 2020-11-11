import React from "react";
import "./ButtonSmall.css";

const ButtonSmall = (props) => {
  const classList = "btn-small btn-" + props.color;
  return (
    <div onClick={props.onClick} className={classList}>
      {props.title}
    </div>
  );
};

export default ButtonSmall;
