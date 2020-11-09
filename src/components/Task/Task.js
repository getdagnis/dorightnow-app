import React from "react";
import ButtonSmall from "../ButtonSmall/ButtonSmall";
import "./Task.css";

const Task = (props) => {
  const { task, type, cat } = props;
  const classList = "task " + type;
  const categoryClass = "cat cat-" + cat;

  return (
    <div className={classList}>
      <div className={categoryClass}></div>
      <p>{task}</p>
      <div className="task-edit">
        <div className="task-btns">
          <ButtonSmall title="edit" color="grey" />
          <ButtonSmall title="do now" color="red" />
        </div>
        <div className="task-btn-delete"></div>
      </div>
    </div>
  );
};

export default Task;
