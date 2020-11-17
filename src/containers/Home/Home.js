import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TasksContext } from "../../context/context.js";

import Sides from "../../components/Sides/Sides";
import MainTask from "../../components/MainTask/MainTask";

function HomePage(props) {
  const { state } = useContext(TasksContext);
  const { tasks, currentTask } = state;

  let chooseOrCreate =
    tasks.length > 0 ? "Choose" : <Link to="/create">Create</Link>;
  console.log("main task", currentTask);
  return (
    <div className="wrapper">
      {currentTask ? (
        <MainTask mainTask={currentTask} />
      ) : (
        <div className="main-task-empty">
          <h1 className="empty-h1">You have nothing to do...</h1>
          <h3 className="empty-h3">{chooseOrCreate} a new task to do!</h3>
        </div>
      )}
      <Sides tasks={tasks} />
    </div>
  );
}

export default HomePage;
