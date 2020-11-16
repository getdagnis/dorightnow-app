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

  const { task, type, cat, id } = props.task;
  const { delay } = props;
  const categoryClasses = "cat cat-" + cat;
  const catColor = cat ? cat : "red";
  let taskClasses = "task " + type;

  // Creates a bounce animation delay for each task seperately based on position in array
  taskClasses = delay ? taskClasses.concat(" delay-" + delay) : taskClasses;

  return (
    <div
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
            <ButtonSmall title="do later" color="grey" />
            <ButtonSmall title="do now" color={catColor} />
          </div>
          <div
            onClick={() => {
              dispatch({ type: "DELETE_TASK", payload: id });
            }}
            className="task-btn-delete"
          ></div>
        </div>
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
