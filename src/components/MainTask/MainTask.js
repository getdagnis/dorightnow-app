import React, { useContext, useState } from "react";
import { Animated } from "react-animated-css";
import Countdown from "react-countdown";
import ReactStopwatch from "react-stopwatch";

import { TasksContext } from "../../context/context";

import "./MainTask.css";
import "./MainTask.anim.css";
import ButtonSmall from "../ButtonSmall/ButtonSmall";

function MainTask(props) {
  const { mainTask, taskSize } = props;
  const { state, dispatch } = useContext(TasksContext);
  const { mainTaskMovement } = state;
  const [isMainTaskVisible, setIsMainTaskVisible] = useState(true);
  const [mainTaskAnim, setMainTaskAnim] = useState("mainTaskDoneSimple");

  console.log("main task", mainTask);

  let classList = "main-task " + taskSize;
  classList =
    mainTask.color !== "0"
      ? classList.concat(" main-task-color-" + mainTask.color)
      : classList;

  const mainBtnColor = "xxl-done btn-" + mainTask.color;

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
          <Animated
            animationOut={mainTaskAnim}
            isVisible={isMainTaskVisible}
            animationOutDuration={1500}
          >
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
          </Animated>
          <div className="main-task-btns">
            <ButtonSmall
              onClick={() => {
                setMainTaskAnim("mainTaskOut");
                setIsMainTaskVisible(false);
                setTimeout(() => {
                  dispatch({
                    type: "CLEAR_MAIN_TASK",
                  });
                }, 1450);
                setTimeout(() => {
                  dispatch({
                    type: "HIDE_LEFT_SIDE",
                    payload: "show",
                  });
                  dispatch({
                    type: "HIDE_RIGHT_SIDE",
                    payload: "show",
                  });
                }, 1500);
              }}
              size="extra-large"
              color="xxl-grey"
              title="give up"
              mainColor={mainTask.color}
            />
            <ButtonSmall
              onClick={() => {
                setMainTaskAnim("mainTaskDoneSimple");
                setIsMainTaskVisible(false);
                setTimeout(() => {
                  dispatch({
                    type: "MAIN_TASK_DONE",
                    payload: { taskId: mainTask.id, action: "done" },
                  });
                }, 1300);
                setTimeout(() => {
                  dispatch({
                    type: "HIDE_LEFT_SIDE",
                    payload: "show",
                  });
                  dispatch({
                    type: "HIDE_RIGHT_SIDE",
                    payload: "show",
                  });
                }, 1300);
              }}
              size="extra-large"
              color={mainBtnColor}
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
          controlled={false}
        />
      </div>
    </div>
  );
}

export default MainTask;
