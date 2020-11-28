import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TasksContext } from "../../context/context.js";
import { MobileView, BrowserView } from "react-device-detect";

import Sides from "../../components/Sides/Sides";
import MainTask from "../../components/MainTask/MainTask";
import "./Home.css";
import "./Home.mobile.css";

function HomePage(props) {
  const { state, dispatch } = useContext(TasksContext);
  const { tasks, currentTask } = state;

  const i = state.tasks.findIndex((t) => t.id === currentTask);
  const mainTask = tasks[i];
  const taskSize =
    mainTask && mainTask.task && mainTask.task.length > 300
      ? "long-task"
      : mainTask && mainTask.task && mainTask.task.length < 82
      ? "short-task"
      : "normal-task";

  // let chooseOrCreate =
  //   tasks && tasks.length > 0 ? "Choose" : <Link to="/create">Create</Link>;
  let chooseOrCreate = tasks && tasks.length > 0 ? "Choose" : "Create";

  console.log(
    "💾 localstorage tasks:",
    JSON.parse(localStorage.getItem("dorightnowTasks"))
  );
  console.log("⛺️ HOME state", state);

  return (
    <React.Fragment>
      <MobileView>
        <div className="wrapper-mobile">
          <div className="main-task-mobile">
            <h1 className="mobile-h1">
              Mobile version temporarily disabled...
            </h1>
            <h3 className="mobile-h3">
              Mobile version has been temporarily removed as it's increasingly
              difficult to maintain two versions at the same time. Please visit
              the desktop version at <br />
              <strong>dorightnow.app</strong>
            </h3>
          </div>
        </div>
      </MobileView>
      <BrowserView>
        <div
          className="wrapper"
          onClick={(e) => {
            if (
              e.target.classList.contains("wrapper") ||
              e.target.classList.contains("main-task-bottom") ||
              e.target.classList.contains("main-task-top") ||
              e.target.classList.contains("main-task-empty") ||
              e.target.parentElement.classList.contains("main-task-empty") ||
              e.target.classList.contains("overflow-bug-fix")
            ) {
              dispatch({
                type: "HIDE_LEFT_SIDE",
                payload: "toggle",
              });
              dispatch({
                type: "HIDE_RIGHT_SIDE",
                payload: "toggle",
              });
            }
          }}
        >
          {mainTask ? (
            <MainTask taskSize={taskSize} mainTask={mainTask} />
          ) : (
            <div className="main-task-empty">
              <h1 className="empty-h1">You have nothing to do...</h1>
              <h3 className="empty-h3">{chooseOrCreate} a new task to do!</h3>
            </div>
          )}
          <Sides tasks={tasks} />
        </div>
      </BrowserView>
    </React.Fragment>
  );
}

export default HomePage;
