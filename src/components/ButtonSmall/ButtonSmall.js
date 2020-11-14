import React from "react";
import "./ButtonSmall.css";

const ButtonSmall = (props) => {
  const { title, color, size, onClick, icon, type } = props;
  let classList = "btn-small btn-" + color;
  classList = size ? classList.concat(" " + size) : classList;
  return (
    <button type={type} onClick={onClick} className={classList}>
      {icon ? (
        <img className="btn-icon" src={icon} alt="Do Right Now logo" />
      ) : null}
      {title}
    </button>
  );
};

export default ButtonSmall;
