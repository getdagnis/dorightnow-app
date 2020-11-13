import React, { useState, useContext, useRef, useEffect } from "react";
import "./TaskAdd.css";

import ButtonSmall from "../ButtonSmall/ButtonSmall";
import { TasksContext } from "../../context/context";

function TaskAdd(props) {
  let { clickHandle } = props;
  // Tutorial: https://www.youtube.com/watch?v=HERhqPlPyuY&list=PL_kAgwZgMfWx4JwTmreX_riVEor7jgnso
  // Github: https://github.com/rivera1294/react-notes-app/tree/master/src/components
  const { state, dispatch } = useContext(TasksContext);
  const [value, setValue] = useState("");
  let ref = useRef();

  useEffect(() => {
    ref.current.focus();
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim() === "") {
      alert("Cannot add a blank task");
    } else {
      dispatch({ type: "ADD_TASK", payload: value });
      setValue("");
    }
  };

  return (
    <div className="new-task-cover">
      <div className="new-task">
        <h2 className="no-tasks no-tasks-bigger">Add a New Task</h2>
        <div className="new-task-form">
          <form onSubmit={handleSubmit} action="">
            <input
              type="text"
              ref={ref}
              onChange={handleChange}
              value={value}
            />
            <button>Add task</button>
          </form>
        </div>

        <textarea
          name="task-text"
          id="task-text"
          placeholder="What do you want to do?"
        ></textarea>
        <table className="task-table">
          <tbody>
            <tr>
              <td className="name-cell">motivation:</td>
              <td>
                <div className="tags-main" data-name="tags-input">
                  <input className="tags-input" type="text" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="name-cell">cathegory:</td>
              <td>
                <select>
                  <option value="15 minutes" selected>
                    No cathegories added
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="name-cell">color:</td>
              <td>
                <div className="color-cell">
                  <span
                    id="grey-color"
                    className="pick-color grey-task active-color"
                    onclick="javascript:pickColor();"
                  ></span>
                  <span
                    id="blue-color"
                    className="pick-color cath-a"
                    onclick="javascript:pickColor();"
                  ></span>
                  <span
                    id="green-color"
                    className="pick-color cath-b"
                    onclick="javascript:pickColor();"
                  ></span>
                  <span
                    id="pink-color"
                    className="pick-color cath-c"
                    onclick="javascript:pickColor();"
                  ></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="add-task-btns">
          <ButtonSmall
            onClick={clickHandle}
            title="Cancel"
            color="grey"
            size="btn-size-large"
          />
          <ButtonSmall
            onClick={clickHandle}
            title="Do Later"
            color="grey"
            size="btn-size-large"
          />
          <ButtonSmall
            onClick={clickHandle}
            title="Do Today"
            color="red"
            size="btn-size-large"
          />
        </div>
      </div>
    </div>
  );
}

export default TaskAdd;
