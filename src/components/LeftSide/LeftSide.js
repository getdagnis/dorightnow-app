import React from "react";
import ButtonSmall from "../ButtonSmall/ButtonSmall";
import TaskList from "../TaskList/TaskList";

import "./LeftSide.css";

export const LeftSide = () => {
  const tasks = [
    { id: 1, task: "do something", cat: "a" },
    { id: 2, task: "do nothing", cat: "b" },
    {
      id: 3,
      task:
        "Don't eat too much bbq ribs. Finish the front-end of the do right now app, so that we can all finally do our tasks",
      cat: 0,
    },
    {
      id: 4,
      task: "drink some wine, watch some movies, read a book and go to sleep",
      cat: "c",
    },
    { id: 5, task: "do something", cat: "a" },
    {
      id: 6,
      task:
        "Don't eat too much bbq ribs. Finish the front-end of the do right now app, so that we can all finally do our tasks",
      cat: 0,
    },
  ];

  return (
    <div className="left-side">
      <div className="left-side-top">
        <h3 className="side-top-h3 title-drop">do today</h3>
        <ButtonSmall title="+ add new" color="red" />
      </div>
      <TaskList tasks={tasks} />
      <div className="left-side-top">
        <h3 className="side-top-h3">coming soon</h3>
        <ButtonSmall title="+ add new" color="grey" />
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
};
