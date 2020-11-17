import React, { useContext } from "react";
import { TasksContext } from "../../context/context";

import "./MainTask.css";
import ButtonSmall from "../ButtonSmall/ButtonSmall";

function MainTask(props) {
  const { mainTask, taskSize } = props;
  const { state, dispatch } = useContext(TasksContext);
  const { mainTaskMovement } = state;

  let classList = "main-task " + taskSize;
  switch (mainTaskMovement) {
    case "in":
      classList = classList.concat(" mainTaskIn");
      break;
    case "done":
      classList = classList.concat(" mainTaskDone");
      break;
    case "out":
      classList = classList.concat(" mainTaskOut");
      break;
    default:
      return null;
  }

  return (
    <div className="main-task-wrapper">
      <div className="main-task-top">
        <h1 className="main-task-h1">do right now</h1>
        <div className="main-task-with-btns">
          <div className={classList}>{mainTask.task}</div>
          <div className="main-task-btns">
            <ButtonSmall
              onClick={() => {
                dispatch({
                  type: "MAIN_TASK_DONE",
                  payload: { action: "giveup" },
                });
              }}
              size="extra-large"
              color="xxl-grey"
              title="give up"
            />
            <ButtonSmall
              onClick={() => {
                dispatch({
                  type: "MAIN_TASK_DONE",
                  payload: { taskId: mainTask.id, action: "done" },
                });
              }}
              size="extra-large"
              color="xxl-red"
              title="done"
            />
          </div>
        </div>
      </div>
      <div className="main-task-bottom">Motivation comes here...</div>
    </div>
  );
}

export default MainTask;
