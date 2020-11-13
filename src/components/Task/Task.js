import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ButtonSmall from "../ButtonSmall/ButtonSmall";
import "./Task.css";
import { TasksContext } from "../../context/context";

const Task = (props) => {
  const { task, type, cat, delay, id } = props;
  const categoryClass = "cat cat-" + cat;
  const catColor = cat ? cat : "red";
  let classList = "task " + type;

  const { dispatch } = useContext(TasksContext);

  // Creates a bounce animation delay for each task seperately based on position in array
  classList = delay ? classList.concat(" delay-" + delay) : classList;

  return (
    <div className={classList}>
      <div className={categoryClass}></div>
      <p>{task}</p>
      {type === "todo" ? (
        <div className="task-edit">
          <div className="task-btns">
            <Link
              to={{
                pathname: "/task/" + id,
                state: { task: task, type: type, cat: cat, id: id },
              }}
            >
              <ButtonSmall title="edit" color="grey" />
            </Link>
            <ButtonSmall title="do now" color={catColor} />
          </div>
          <div
            onClick={() => dispatch({ type: "DELETE_TASK", payload: id })}
            className="task-btn-delete"
          ></div>
        </div>
      ) : (
        <div className="task-btn-hide"></div>
      )}
    </div>
  );
};

export default Task;
