import React, { useContext, useState, useEffect } from "react";
import ButtonSmall from "../ButtonSmall/ButtonSmall";
import TaskList from "../TaskList/TaskList";
import TaskAdd from "../TaskAdd/TaskAdd";
import addIcon from "./add_new.svg";
import doTodayIcon from "../TaskAdd/quick.svg";

import { TasksContext } from "../../context/context";

const LeftSide = () => {
  const { state, dispatch } = useContext(TasksContext);
  const [addTask, setAddTask] = useState(false);
  const { tasks, justDeleted } = state;

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: "REMOVE_JUSTDELETED" });
    }, 5000);

    return () => clearTimeout(timeout);
  }, [justDeleted]);

  useEffect(() => {
    function onKeyup(e) {
      if (e.key === "n" || e.key === "N") setAddTask(true);
      if (e.key === "Escape") setAddTask(false);
    }
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
  }, []);

  return (
    <React.Fragment>
      {addTask ? (
        <TaskAdd
          clickHandle={() => {
            setAddTask(!addTask);
          }}
        />
      ) : null}
      <div className="side left-side">
        <div className="safari-flex-height-fix">
          <div className="side-top">
            <h3 className="side-top-h3 title-drop">
              <img className="side-h3-icon" src={doTodayIcon} alt="Do today" />
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

        <TaskList tasks={tasks} />

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
    </React.Fragment>
  );
};

export default LeftSide;
