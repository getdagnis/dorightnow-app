import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Sides from "../../components/Sides/Sides";
import { TasksContext } from "../../context/context.js";

function HomePage(props) {
  const { state } = useContext(TasksContext);
  const { tasks } = state;

  let chooseOrCreate =
    tasks.length > 0 ? "Choose" : <Link to="/create">Create</Link>;

  return (
    <div className="wrapper">
      <div className="main-task">
        <h1 className="empty-h1">You have nothing to do...</h1>
        <h3 className="empty-h3">{chooseOrCreate} a new task to do!</h3>
      </div>
      <Sides tasks={tasks} />
    </div>
  );
}

export default HomePage;
