import React, { useContext, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useForm, useFieldArray } from "react-hook-form";

import "./TaskAdd.css";
import ButtonSmall from "../ButtonSmall/ButtonSmall";
import { TasksContext } from "../../context/context";
import turtleIcon from "./turtle.svg";
import quickIcon from "./quick.svg";

function TaskAdd(props) {
  let { clickHandle } = props;
  const { dispatch } = useContext(TasksContext);

  let ref = useRef();

  useEffect(() => {
    ref.current.focus();
  });

  // FORM HANDLING BY REACT-HOOK-FORM
  const { register, control, handleSubmit, errors } = useForm();

  const { append } = useFieldArray({
    control,
    name: "test",
  });

  const onSubmit = (data) => {
    console.log("submit data", data);
    dispatch({ type: "ADD_TASK", payload: data });
    clickHandle();
  };
  console.log("task adding errors", errors);

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(onSubmit)();
    }
  };

  function doLaterAction(e) {
    console.log("do later event", e);
    // handleSubmit(onSubmit)();
  }

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
            onKeyPress={handleUserKeyPress}
            ref={(e) => {
              register(e, { required: true, max: 140, min: 1, maxLength: 600 });
              ref.current = e;
            }}
          />
          <input
            className="task-input"
            autoComplete="off"
            type="text"
            placeholder="Motivation – €300, trip to Italy, avoid a punch in the face"
            name="motivation"
            ref={register({ maxLength: 420 })}
          />
          Select category (or create a new one):
          <select
            className="task-input cat-select"
            name="category"
            ref={register}
          >
            Select category (optional):
            <option value="none">None</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="andis">Andis</option>
            <option value="marcis">Mārcis</option>
          </select>
          <input
            name="color"
            type="radio"
            value="none"
            ref={register}
            defaultChecked
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
              size={isMobile ? "mobile" : "large"}
            />
            <ButtonSmall
              onClick={() => {
                append({ list: "later" });
                doLaterAction();
              }}
              title="Do later"
              color="grey"
              size={isMobile ? "mobile" : "large"}
              icon={turtleIcon}
            />
            <ButtonSmall
              // onClick={handleSubmit(onSubmit())}
              type="submit"
              title="Do today"
              color="red"
              size={isMobile ? "mobile" : "large"}
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
