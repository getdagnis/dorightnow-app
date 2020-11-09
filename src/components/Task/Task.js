import React from "react";
import ButtonSmall from "../ButtonSmall/ButtonSmall";
import "./Task.css";

const Task = (props) => {
  const { task, type, cat } = props;
  const classList = "task " + type;
  const categoryClass = "cat cat-" + cat;
  const catColor = cat ? cat : "red";

  return (
    <div className={classList}>
      <div className={categoryClass}></div>
      <p>{task}</p>
      {type === "todo" ? (
        <div className="task-edit">
          <div className="task-btns">
            <ButtonSmall title="edit" color="grey" />
            <ButtonSmall title="do now" color={catColor} />
          </div>
          <div className="task-btn-delete"></div>
        </div>
      ) : (
        <div className="task-btn-hide"></div>
      )}
    </div>
  );
};

export default Task;
