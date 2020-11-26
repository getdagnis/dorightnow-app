import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ButtonSmall from "../ButtonSmall/ButtonSmall";
import TaskList from "../TaskList/TaskList";
import TaskAdd from "../TaskAdd/TaskAdd";
import addIcon from "./img/add_new.svg";
import doTodayIcon from "../TaskAdd/assets/quick.svg";
import leftArrow from "./img/arr-left.png";

import { TasksContext } from "../../context/context";

const LeftSide = () => {
  const { state, dispatch } = useContext(TasksContext);
  const [addTask, setAddTask] = useState(false);
  const { justDeleted, hideLeftSide } = state;
  const location = useLocation().pathname;

  let showTip = true;

  // REMOVES THE "UNDO LAST DELETED" BUTTON AFTER TIMEOUT
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: "REMOVE_JUSTDELETED" });
    }, 5000);
    return () => clearTimeout(timeout);
  }, [justDeleted]);

  const sideClassList = hideLeftSide
    ? "side left-side left-side-out"
    : "side left-side";

  const arrowClassList = hideLeftSide ? "arr-left rot-180" : "arr-left";

  useEffect(() => {
    if (location === "/") {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  // ADDS "N" KEYBOARD SHORTCUT FOR A "NEW TASK"
  const handleKeyDown = (e) => {
    if (e.key === "n" && e.ctrlKey === true) {
      console.log(e);
      setAddTask(true);
    }
  };

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
        <div className="overflow-bug-fix left-side-marker">
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
          <TaskList listType="todo" />
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

// // ADDS "N" KEYBOARD SHORTCUT FOR A "NEW TASK"
// const handleKeyDown = (e) => {
//   if (e.key === "n") {
//     setAddTask(true);
//   }
// };

// // LISTENS FOR KEYBOARD SHORTCUTS IF NOT DISABLED
// useEffect(() => {
//   if (location === "/" && !homeShortcutsDisable) {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }
// }, [homeShortcutsDisable]);
