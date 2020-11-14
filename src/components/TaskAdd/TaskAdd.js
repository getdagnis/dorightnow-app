import React, { useState, useContext, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useForm } from "react-hook-form";

import "./TaskAdd.css";
import ButtonSmall from "../ButtonSmall/ButtonSmall";
import { TasksContext } from "../../context/context";
import turtleIcon from "./turtle.svg";
import quickIcon from "./quick.svg";

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

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (value.trim() === "") {
  //     alert("Cannot add a blank task");
  //   } else {
  //     dispatch({ type: "ADD_TASK", payload: value });
  //     setValue("");
  //     clickHandle();
  //   }
  // };
  // FORM HANDLING BY REACT-HOOK-FORM
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    dispatch({ type: "ADD_TASK", payload: data });
    setValue("");
    clickHandle();
  };
  console.log(errors);

  return (
    <React.Fragment>
      <div className="new-task">
        <h2 className="no-tasks no-tasks-bigger">Add something to do...</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            className="task-input"
            type="text"
            placeholder="Add a new task..."
            name="task"
            rows="3"
            ref={(e) => {
              register(e, { required: true, max: 140, min: 1, maxLength: 140 });
              ref.current = e;
            }}
          />
          <input
            className="task-input"
            autoComplete="off"
            type="text"
            placeholder="Motivation, e.g., €300, trip to Italy, avoid a punch in the face"
            name="motivation"
            ref={register({ max: 3, min: 1, maxLength: 140 })}
          />
          Select category (optional):
          <select
            className="task-input cat-select"
            name="category"
            ref={register}
          >
            Select color (optional):
            <option value="None">None</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Andis">Andis</option>
            <option value="Mārcis">Mārcis</option>
          </select>
          <input
            name="color"
            type="radio"
            value="none"
            ref={register}
            checked
          />
          <input name="color" type="radio" value="salmon" ref={register} />
          <input name="color" type="radio" value="olive" ref={register} />
          <input name="color" type="radio" value="blue" ref={register} />
          <input name="color" type="radio" value="gold" ref={register} />
          <input name="color" type="radio" value="purple" ref={register} />
          <div className="add-task-btns">
            <ButtonSmall
              onClick={clickHandle}
              title="Cancel"
              color="grey"
              size={isMobile ? "btn-size-mobile" : "btn-size-large"}
            />
            <ButtonSmall
              type="submit"
              title="Do later"
              color="grey"
              size={isMobile ? "btn-size-mobile" : "btn-size-large"}
              icon={turtleIcon}
            />
            <ButtonSmall
              type="submit"
              title="Do today"
              color="red"
              size={isMobile ? "btn-size-mobile" : "btn-size-large"}
              icon={quickIcon}
            />
          </div>
        </form>
      </div>
      <div className="new-task-cover"></div>
    </React.Fragment>
  );
}

export default TaskAdd;

// <div className="new-task-form">
// <form onSubmit={handleSubmit} action="">
//   <input
//     type="text"
//     ref={ref}
//     onChange={handleChange}
//     value={value}
//   />
//   <button>Add task</button>
// </form>
// </div>

// <textarea
// name="task-text"
// id="task-text"
// placeholder="What do you want to do?"
// ></textarea>
// <table className="task-table">
// <tbody>
//   <tr>
//     <td className="name-cell">motivation:</td>
//     <td>
//       <div className="tags-main" data-name="tags-input">
//         <input className="tags-input" type="text" />
//       </div>
//     </td>
//   </tr>
//   <tr>
//     <td className="name-cell">cathegory:</td>
//     <td>
//       <select>
//         <option value="15 minutes" selected>
//           No cathegories added
//         </option>
//       </select>
//     </td>
//   </tr>
//   <tr>
//     <td className="name-cell">color:</td>
//     <td>
//       <div className="color-cell">
//         <span
//           id="grey-color"
//           className="pick-color grey-task active-color"
//           onclick="javascript:color();"
//         ></span>
//         <span
//           id="blue-color"
//           className="pick-color cath-a"
//           onclick="javascript:color();"
//         ></span>
//         <span
//           id="green-color"
//           className="pick-color cath-b"
//           onclick="javascript:color();"
//         ></span>
//         <span
//           id="pink-color"
//           className="pick-color cath-c"
//           onclick="javascript:color();"
//         ></span>
//       </div>
//     </td>
//   </tr>
// </tbody>
// </table>
