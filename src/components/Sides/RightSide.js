import React from "react";
import TaskList from "../TaskList/TaskList";

const RightSide = (props) => {
  const { tasks } = props;
  const filteredTasks = tasks.filter((t) => t.type === "done");

  return (
    <div className="side right-side">
      <div className="safari-flex-height-fix">
        <div className="side-top">
          <h3 className="side-top-h3 title-drop">Done today</h3>
        </div>
      </div>
      <TaskList tasks={filteredTasks} listType="done" />
    </div>
  );
};

export default RightSide;
