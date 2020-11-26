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
  const [notesVisible, setNotesVisible] = useState(false);
  const [mainTaskAnim, setMainTaskAnim] = useState({
    anim: "mainTaskDoneSimple",
    duration: 1200,
  });

  let classList = "main-task " + taskSize;
  classList =
    mainTask.color !== "0"
      ? classList.concat(" main-task-color-" + mainTask.color)
      : classList;
  classList = notesVisible
    ? classList.concat(" main-task-with-notes")
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

  const Stopwatch = () => (
    <ReactStopwatch
      seconds={0}
      minutes={0}
      hours={0}
      // limit="00:00:10"
      onChange={({ hours, minutes, seconds }) => {
        // const localCounterData = localStorage.getItem("counterData")
        //   ? localStorage.getItem("counterData")
        //   : null;
        // localCounterData &&
        // (localCounterData.minutes > 0 || localCounterData.hours > 0)
        //   ? console.log("local hours", localCounterData.minutes)
        //   : console.log("empty local storage");
        // const counterData = {
        //   id: mainTask.id,
        //   hours: hours,
        //   minutes: minutes,
        // };
        // console.log("counterData", {
        //   id: mainTask.id,
        //   hours: hours,
        //   minutes: minutes,
        // });
      }}
      onCallback={() => console.log("Finish")}
      render={({ formatted, hours, minutes, seconds }) => {
        return (
          <div className="countdown">
            <span className="countdown-units">{hours}h</span>
            <span className="countdown-units">{minutes}m</span>
            <span className="countdown-units">{seconds}s</span>
          </div>
        );
      }}
    />
  );

  return (
    <div className="main-task-wrapper">
      <div className="main-task-top">
        <h1 className="main-task-h1">do right now</h1>
        <h3 className="empty-h3 main-task-h3">
          (because you can only do one important thing at a time)
        </h3>
        <div className="main-task-with-btns">
          <Animated
            animationOut={mainTaskAnim.anim}
            animationOutDuration={mainTaskAnim.duration}
            isVisible={isMainTaskVisible}
          >
            <div className="notes-container">
              <div
                className={classList}
                onClick={() => {
                  // setNotesVisible(!notesVisible);
                  const time = new Date().getTime();
                  console.log("time", time);
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
              <div
                className={
                  notesVisible
                    ? "main-task-notes notes-visible"
                    : "main-task-notes"
                }
              >
                <div className="notes-contents">
                  <h4 className="subtask-h4">
                    + Add a new subtask... (doesn't work yet)
                  </h4>
                </div>
              </div>
            </div>
          </Animated>
          <div className={notesVisible ? "main-btns-hide" : "main-btns-show"}>
            <div className="main-task-btns">
              <ButtonSmall
                onClick={() => {
                  setMainTaskAnim({
                    anim: "mainTaskOut",
                    duration: 1500,
                  });
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
              {
                // TODO will not work here as edit task window is currently launched from leftside component
                // need to movie it out and assign a router to it!
                // <ButtonSmall
                //   onClick={() => {
                //     dispatch({
                //       type: "UPDATE_TASK",
                //       payload: { taskId: mainTask.id },
                //     });
                //   }}
                //   size="extra-large"
                //   color="xxl-grey"
                //   title="edit"
                //   mainColor={mainTask.color}
                // />
              }
              <ButtonSmall
                onClick={() => {
                  setMainTaskAnim({
                    anim: "mainTaskDoneSimple",
                    duration: 1400,
                  });
                  setIsMainTaskVisible(false);
                  setTimeout(() => {
                    dispatch({
                      type: "MAIN_TASK_DONE",
                      payload: { taskId: mainTask.id, action: "done" },
                    });
                  }, 1100);
                  setTimeout(() => {
                    dispatch({
                      type: "HIDE_LEFT_SIDE",
                      payload: "show",
                    });
                    dispatch({
                      type: "HIDE_RIGHT_SIDE",
                      payload: "show",
                    });
                  }, 1100);
                }}
                size="extra-large"
                color={mainBtnColor}
                title="done"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="main-task-bottom">
        Time spent so far:
        <Stopwatch />
      </div>
    </div>
  );
}

export default MainTask;

// <Countdown
//   className="countdown"
//   date={Date.now() + 900000}
//   renderer={countdownRenderer}
//   controlled={false}
// />
