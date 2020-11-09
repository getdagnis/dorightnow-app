import React from "react";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";

import "./SidesLeftAndRight.css";

const SidesLeftAndRight = (props) => {
  const { tasks, done } = props;
  return (
    <React.Fragment>
      <LeftSide tasks={tasks} />
      <RightSide done={null} />
    </React.Fragment>
  );
};

export default SidesLeftAndRight;
