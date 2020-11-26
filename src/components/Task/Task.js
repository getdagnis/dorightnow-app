import React, { useContext, useState } from "react";
import { MobileView, isMobile } from "react-device-detect";

import { TasksContext } from "../../context/context";

import "./Task.css";
import ButtonSmall from "../ButtonSmall/ButtonSmall";
import TaskAdd from "../TaskAdd/TaskAdd";

const Task = (props) => {
  const { dispatch } = useContext(TasksContext);
  const [editTask, setEditTask] = useState(false);
  const [mobileTaskEditOpen, setMobileTaskEditOpen] = useState(false);

  const { task, type, color, id } = props.task;
  const { delay, ...draggableProps } = props;
  const categoryClasses = color !== "0" ? "cat cat-" + color : null;
  const catColor = color ? color : "red";
  let taskClasses = "task " + type;

  // Creates a bounce animation delay for each task seperately based on position in array
  taskClasses = delay ? taskClasses.concat(" delay-" + delay) : taskClasses;

  const mainTaskLaunch = () => {
    dispatch({ type: "CLEAR_MAIN_TASK", payload: id });

    setTimeout(() => {
      dispatch({ type: "SET_MAIN_TASK", payload: id });
    }, 0);
    setTimeout(() => {
      dispatch({ type: "HIDE_LEFT_SIDE", payload: "hide" });
      dispatch({ type: "HIDE_RIGHT_SIDE", payload: "hide" });
    }, 500);
  };

  return (
    <div
      ref={props.draggableRef}
      {...draggableProps}
      className={taskClasses}
      onClick={
        isMobile ? () => setMobileTaskEditOpen(!mobileTaskEditOpen) : null
      }
    >
      <div className={categoryClasses}></div>
      <p>{task}</p>

      <MobileView>
        {mobileTaskEditOpen ? (
          <div className="task-edit-mobile">
            <div className="task-btns">
              <ButtonSmall title="edit" color="grey" />
              <ButtonSmall title="do later" color="grey" />
              <ButtonSmall title="do now" color={catColor} />
            </div>
            <div
              onClick={() => dispatch({ type: "DELETE_TASK", payload: id })}
              className="task-btn-delete"
            ></div>
          </div>
        ) : null}
      </MobileView>

      {
        // DESKTOP BROWSER VIEW STARTS HERE
      }
      {!isMobile && type === "todo" ? (
        <div className="task-edit">
          <div className="task-btns">
            <ButtonSmall
              onClick={() => {
                setEditTask(true);
              }}
              title="edit"
              color="grey"
            />

            <ButtonSmall
              onClick={() => {
                mainTaskLaunch();
              }}
              title="do now"
              color={catColor}
            />
          </div>
          <div
            onClick={() => {
              dispatch({ type: "DELETE_TASK", payload: id });
            }}
            className="task-btn-delete"
          ></div>
        </div>
      ) : null}
      {type === "done" ? (
        <div
          onClick={() => {
            dispatch({ type: "DELETE_TASK", payload: id });
          }}
          className="task-btn-hide"
        ></div>
      ) : null}
      {editTask ? (
        <TaskAdd
          taskEdit="true"
          thisTask={props.task}
          clickHandle={() => {
            setEditTask(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default Task;
