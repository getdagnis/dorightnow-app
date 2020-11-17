import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TasksContext } from "../../context/context.js";

import Sides from "../../components/Sides/Sides";
import MainTask from "../../components/MainTask/MainTask";

function HomePage(props) {
  const { state } = useContext(TasksContext);
  const { tasks, currentTask, mainTaskMovement } = state;

  const i = state.tasks.findIndex((t) => t.id === currentTask);
  const mainTask = tasks[i];
  const taskSize =
    mainTask && mainTask.task && mainTask.task.length > 300
      ? "long-task"
      : mainTask && mainTask.task && mainTask.task.length < 100
      ? "short-task"
      : "normal-task";

  let chooseOrCreate =
    tasks.length > 0 ? "Choose" : <Link to="/create">Create</Link>;
  console.log("main task", mainTask);
  console.log("length", taskSize);

  return (
    <div className="wrapper">
      {mainTask ? (
        <MainTask
          moves={mainTaskMovement}
          taskSize={taskSize}
          mainTask={mainTask}
        />
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
