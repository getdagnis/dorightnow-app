import React from "react";
import ButtonSmall from "../../ButtonSmall/ButtonSmall";
import TaskList from "../../TaskList/TaskList";

import "./LeftSide.css";

const LeftSide = (props) => {
  const { tasks } = props;
  return (
    <div className="side left-side">
      <div className="safari-flex-height-fix">
        <div className="side-top">
          <h3 className="side-top-h3 title-drop">Do today</h3>
          <ButtonSmall title="add new" color="red" />
        </div>
      </div>
      <TaskList tasks={tasks} />

      <div className="safari-flex-height-fix">
        <div className="side-top">
          <h3 className="side-top-h3">Coming soon...</h3>
          <ButtonSmall title="add new" color="grey" />
        </div>
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default LeftSide;
