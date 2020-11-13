import React from "react";
import "./ButtonSmall.css";

const ButtonSmall = (props) => {
  const { title, color, size, onClick } = props;
  let classList = "btn-small btn-" + color;
  classList = size ? classList.concat(" " + size) : classList;
  return (
    <div onClick={onClick} className={classList}>
      {title}
    </div>
  );
};

export default ButtonSmall;
