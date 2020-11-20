import React, { useContext, useState, useEffect } from "react";
import ButtonSmall from "../ButtonSmall/ButtonSmall";
import TaskList from "../TaskList/TaskList";
import TaskAdd from "../TaskAdd/TaskAdd";
import addIcon from "./img/add_new.svg";
import doTodayIcon from "../TaskAdd/quick.svg";
import leftArrow from "./img/arr-left.png";

import { TasksContext } from "../../context/context";

const LeftSide = () => {
  const { state, dispatch } = useContext(TasksContext);
  const [addTask, setAddTask] = useState(false);
  const { tasks, justDeleted, hideLeftSide } = state;
  const filteredTasks = tasks.filter((t) => t.type === "todo");

  let showTip = true;

  // REMOVES THE "UNDO LAST DELETED" BUTTON AFTER TIMEOUT
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: "REMOVE_JUSTDELETED" });
    }, 5000);

    return () => clearTimeout(timeout);
  }, [justDeleted]);

  console.log("side left side hid", hideLeftSide);

  const sideClassList = state.hideLeftSide
    ? "side left-side left-side-out"
    : "side left-side";

  const arrowClassList = state.hideLeftSide ? "arr-left rot-180" : "arr-left";

  return (
    <React.Fragment>
      {addTask ? (
        <TaskAdd
          clickHandle={() => {
            setAddTask(!addTask);
          }}
          showTip={showTip}
        />
      ) : null}
      <div className={sideClassList}>
        <div
          className="slide-btn-left"
          onClick={() => {
            dispatch({ type: "HIDE_LEFT_SIDE", payload: "toggle" });
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
              <h3 className="side-top-h3 title-drop">
                <img
                  className="side-h3-icon"
                  src={doTodayIcon}
                  alt="Do today"
                />
                Do today
              </h3>
              <ButtonSmall
                onClick={() => setAddTask(!addTask)}
                title="add new"
                color="red"
                icon={addIcon}
              />
            </div>
          </div>
          <TaskList tasks={filteredTasks} />
          {justDeleted ? (
            <div className="undo-btn">
              <ButtonSmall
                onClick={() => dispatch({ type: "UNDELETE_TASK" })}
                title="Undo last deleted"
                color="grey"
                size="large"
              />
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LeftSide;
