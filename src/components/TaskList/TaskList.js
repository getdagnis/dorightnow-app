import React from "react";
import "./TaskList.css";
import Task from "../Task/Task";

const TaskList = (props) => {
  const { tasks } = props;
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((t) => {
          return <Task key={t.id} type="todo" task={t.task} cat={t.cat} />;
        })
      ) : (
        <h3 className="no-tasks">no tasks added</h3>
      )}
    </div>
  );
};

export default TaskList;
