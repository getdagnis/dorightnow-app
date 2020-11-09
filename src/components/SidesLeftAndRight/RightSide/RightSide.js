import React from "react";
import TaskList from "../../TaskList/TaskList";

import "./RightSide.css";

const RightSide = (props) => {
  const { done } = props;
  return (
    <div className="side right-side">
      <div className="safari-flex-height-fix">
        <div className="side-top">
          <h3 className="side-top-h3 title-drop">Done today</h3>
        </div>
      </div>
      <TaskList tasks={done} listType="done" />
    </div>
  );
};

export default RightSide;
