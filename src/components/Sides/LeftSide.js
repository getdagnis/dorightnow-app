import React, { useContext, useState } from "react";
import ButtonSmall from "../ButtonSmall/ButtonSmall";
import TaskList from "../TaskList/TaskList";
import TaskAdd from "../TaskAdd/TaskAdd";
import addIcon from "./add_new.svg";
import doTodayIcon from "../TaskAdd/quick.svg";

import { TasksContext } from "../../context/context";

const LeftSide = () => {
  const { state, dispatch } = useContext(TasksContext);
  const [addTask, setAddTask] = useState(false);
  const tasks = state.tasks;

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
        {
          // <div className="safari-flex-height-fix">
          //   <div className="side-top">
          //     <h3 className="side-top-h3">Coming soon...</h3>
          //     <ButtonSmall title="add new" color="grey" />
          //   </div>
          // </div>
          // <TaskList tasks={tasks} />
        }
      </div>
    </React.Fragment>
  );
};

export default LeftSide;
