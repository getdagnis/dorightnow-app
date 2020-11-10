import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

import "./Sides.css";

const Sides = (props) => {
  const { tasks, done } = props;
  return (
    <React.Fragment>
      <LeftSide tasks={tasks} />
      <RightSide done={done} />
    </React.Fragment>
  );
};

export default Sides;
