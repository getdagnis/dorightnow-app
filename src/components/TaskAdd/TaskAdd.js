import React, { useContext, useRef, useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";

import "./TaskAdd.css";
import ButtonSmall from "../ButtonSmall/ButtonSmall";
import { TasksContext } from "../../context/context";
import turtleIcon from "./turtle.svg";
import quickIcon from "./quick.svg";

function TaskAdd(props) {
  let { clickHandle } = props;
  const { dispatch } = useContext(TasksContext);
  const [showOptions, setShowOptions] = useState(false);

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
    <FormProvider>
      <div className="new-task">
        <h2 className="no-tasks no-tasks-bigger">Add something to do...</h2>

        <form className="new-task-form" onSubmit={handleSubmit(onSubmit)}>
          <textarea
            className="textarea task-input"
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
          {showOptions ? (
            <div>
              <h3 className="form-h3">Motivation to finish:</h3>
              <input
                className="task-input"
                autoComplete="off"
                type="text"
                placeholder="€300, trip to Italy, avoid a punch in the face..."
                name="motivation"
                ref={register({ maxLength: 420 })}
              />
              <h3 className="form-h3">Select a category:</h3>
              <div className="form-category">
                <select
                  className="task-input cat-select"
                  name="category"
                  ref={register}
                >
                  <option value="none">None</option>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="andis">Andis</option>
                  <option value="marcis">Mārcis</option>
                </select>
                <div className="new-cat">Create New</div>
              </div>
              <h3 className="form-h3">Select color:</h3>
              <div className="form-radio-btns">
                <span className="form-radio cat-0">
                  <input
                    name="color"
                    type="radio"
                    value="0"
                    ref={register}
                    defaultChecked
                  />
                </span>
                <span className="form-radio cat-a">
                  <input name="color" type="radio" value="a" ref={register} />
                </span>
                <span className="form-radio cat-b">
                  <input name="color" type="radio" value="b" ref={register} />
                </span>
                <span className="form-radio cat-c">
                  <input name="color" type="radio" value="c" ref={register} />
                </span>
                <span className="form-radio cat-d">
                  <input name="color" type="radio" value="d" ref={register} />
                </span>
                <span className="form-radio cat-e">
                  <input name="color" type="radio" value="e" ref={register} />
                </span>
              </div>
            </div>
          ) : (
            <div
              className="show-options"
              onClick={() => {
                setShowOptions(!showOptions);
              }}
            >
              + Show optional details
            </div>
          )}
          <div className="add-task-btns">
            <div className="task-btns-left">
              <ButtonSmall
                onClick={clickHandle}
                title="Cancel"
                color="grey"
                size={isMobile ? "mobile" : "large"}
              />
            </div>
            <div className="task-btns-right">
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
          </div>
        </form>
      </div>
      <div className="new-task-cover"></div>
    </FormProvider>
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
