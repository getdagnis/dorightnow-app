import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

import "./Sides.css";

const Sides = (props) => {
  const { tasks } = props;
  return (
    <React.Fragment>
      <LeftSide tasks={tasks} />
      <RightSide tasks={tasks} />
    </React.Fragment>
  );
};

export default Sides;
