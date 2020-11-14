import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BrowserView, MobileView, isMobile } from "react-device-detect";

import "./Task.css";
import ButtonSmall from "../ButtonSmall/ButtonSmall";
import { TasksContext } from "../../context/context";

const Task = (props) => {
  const [mobileTaskEditOpen, setMobileTaskEditOpen] = useState(false);
  const { task, type, cat, delay, id } = props;
  const categoryClasses = "cat cat-" + cat;
  const catColor = cat ? cat : "red";
  let taskClasses = "task " + type;

  const { dispatch } = useContext(TasksContext);

  // Creates a bounce animation delay for each task seperately based on position in array
  taskClasses = delay ? taskClasses.concat(" delay-" + delay) : taskClasses;

  function mobileTaskEdit(e) {
    e.target.classList.contains("task-edit")
      ? e.target.parentElement.parentElement.classList.remove(
          "task-edit-mobile-visible"
        )
      : e.target.parentElement.classList.toggle("task-edit-mobile-visible");
    console.log(e.target.parentElement.parentElement);
    setMobileTaskEditOpen(!mobileTaskEditOpen);
  }

  return (
    <div className={taskClasses} onClick={(e) => mobileTaskEdit(e)}>
      <div className={categoryClasses}></div>
      <p>{task}</p>
      <MobileView>
        <h1> This is rendered only on mobile </h1>
      </MobileView>{" "}
      {type === "todo" ? (
        <div className="task-edit" onClick={(e) => mobileTaskEdit(e)}>
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
