import React from "react";

import "./MainTask.css";
import ButtonSmall from "../ButtonSmall/ButtonSmall";

function MainTask(props) {
  const { mainTask } = props;
  return (
    <div className="main-task-wrapper">
      <div className="main-task-top">
        <h1 className="main-task-h1">do right now</h1>
        <div className="main-task-with-btns">
          <div className="main-task">{mainTask.task}</div>
          <div className="main-task-btns">
            <ButtonSmall size="extra-large" color="xxl-grey" title="give up" />
            <ButtonSmall size="extra-large" color="xxl-red" title="it's done" />
          </div>
        </div>
      </div>
      <div className="main-task-bottom">Motivation comes here...</div>
    </div>
  );
}

export default MainTask;
