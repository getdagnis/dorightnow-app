import React, { useContext } from "react";
import isMobile from "react-device-detect";

import { TasksContext } from "../../context/context";
import leftArrow from "./img/arr-left.png";
import Feedback from "../Feedback/Feedback";
import TaskList from "../TaskList/TaskList";

const RightSide = () => {
  const { state, dispatch } = useContext(TasksContext);
  const { tasks, hideRightSide } = state;

  const filteredTasks = tasks.filter((t) => t.type === "done");

  const sideClassList = hideRightSide
    ? "side right-side right-side-out"
    : "side right-side";

  const arrowClassList = hideRightSide ? "arr-left" : "arr-left rot-180";

  return (
    <div className={sideClassList}>
      <div
        className="slide-btn-right"
        onClick={() => {
          dispatch({ type: "HIDE_RIGHT_SIDE", payload: "toggle" });
        }}
      >
        <img
          className={arrowClassList}
          src={leftArrow}
          alt="Do Right Now logo"
        />
      </div>
      <div className="overflow-bug-fix">
        <div className="safari-flex-height-fix">
          <div className="side-top">
            <h3 className="side-top-h3 title-drop">Done today</h3>
          </div>
        </div>
        {<TaskList tasks={filteredTasks} listType="done" />}
        {!isMobile ? <Feedback /> : null}
      </div>
    </div>
  );
};

export default RightSide;
