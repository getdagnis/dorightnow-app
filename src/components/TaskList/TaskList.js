import React from "react";

import "./TaskList.css";
import Task from "../Task/Task";

const TaskList = (props) => {
  const { tasks, listType } = props;
  return (
    <div className="task-list">
      {tasks && tasks.length > 0 ? (
        tasks.map((t) => {
          let delay = tasks.indexOf(t) + 2;
          return <Task key={t.id} delay={delay} task={t} />;
        })
      ) : listType === "done" ? (
        <h3 className="no-tasks">Nothing done today</h3>
      ) : (
        <h3 className="no-tasks">No tasks added</h3>
      )}
    </div>
  );
};

export default TaskList;
