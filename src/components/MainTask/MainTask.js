import React, { useContext } from "react";
import { TasksContext } from "../../context/context";
import Countdown from "react-countdown";

import "./MainTask.css";
import ButtonSmall from "../ButtonSmall/ButtonSmall";

function MainTask(props) {
  const { mainTask, taskSize } = props;
  const { state, dispatch } = useContext(TasksContext);
  const { mainTaskMovement } = state;

  console.log(mainTask);

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

  const Completionist = () => <span>You missed the deadline!</span>;

  const countdownRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="countdown">
          <span className="countdown-units">{hours}h</span>
          <span className="countdown-units">{minutes}m</span>
          <span className="countdown-units">{seconds}s</span>
        </div>
      );
    }
  };

  return (
    <div className="main-task-wrapper">
      <div className="main-task-top">
        <h1 className="main-task-h1">do right now</h1>
        <div className="main-task-with-btns">
          <div
            className={classList}
            onClick={() => {
              dispatch({
                type: "HIDE_LEFT_SIDE",
                payload: "toggle",
              });
              dispatch({
                type: "HIDE_RIGHT_SIDE",
                payload: "toggle",
              });
            }}
          >
            <p>{mainTask.task}</p>
          </div>
          <div className="main-task-btns">
            <ButtonSmall
              onClick={() => {
                dispatch({
                  type: "MAIN_TASK_DONE",
                  payload: { action: "giveup" },
                });
                setTimeout(() => {
                  dispatch({
                    type: "HIDE_LEFT_SIDE",
                    payload: "show",
                  });
                  dispatch({
                    type: "HIDE_RIGHT_SIDE",
                    payload: "show",
                  });
                }, 500);
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
                setTimeout(() => {
                  dispatch({
                    type: "HIDE_LEFT_SIDE",
                    payload: "show",
                  });
                  dispatch({
                    type: "HIDE_RIGHT_SIDE",
                    payload: "show",
                  });
                }, 500);
              }}
              size="extra-large"
              color="xxl-red"
              title="done"
            />
          </div>
        </div>
      </div>
      <div className="main-task-bottom">
        Time's running out!
        <Countdown
          className="countdown"
          date={Date.now() + 900000}
          renderer={countdownRenderer}
        />
      </div>
    </div>
  );
}

export default MainTask;
