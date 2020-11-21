import React, { useContext, useRef, useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useForm, FormProvider } from "react-hook-form";

import { TasksContext } from "../../context/context";
import "./TaskAdd.css";
import turtleIcon from "./turtle.svg";
import quickIcon from "./quick.svg";
import ButtonSmall from "../ButtonSmall/ButtonSmall";

function TaskAdd(props) {
  let { clickHandle, taskEdit, thisTask, showTip } = props;
  const { state, dispatch } = useContext(TasksContext);
  const [showOptions, setShowOptions] = useState(false);

  const fetchedCategories = state.categories;
  const colors = [
    // { name: "default", className: "form-radio cat-0", value: "0" },
    { name: "teal", class: "form-label cat-a", value: "a" },
    { name: "olive", class: "form-label cat-b", value: "b" },
    { name: "apricot", class: "form-label cat-c", value: "c" },
    { name: "gold", class: "form-label cat-d", value: "d" },
    { name: "purple", class: "form-label cat-e", value: "e" },
  ];

  const showKeyboardTip =
    localStorage.getItem("showKeyboardTip") === "off" ? false : false; // TURNED OFF!!! FOR NOW...

  let ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  // FORM HANDLING BY REACT-HOOK-FORM
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log("submit data", data);
    console.warn("errors", errors);
    dispatch({ type: "ADD_TASK", payload: data });
    clickHandle();
  };

  const onEdit = (data) => {
    console.log("submit data", data);
    dispatch({
      type: "UPDATE_TASK",
      payload: { data, taskId: thisTask.id },
    });
    clickHandle();
  };

  const handleUserKeyPress = (e) => {
    if (!taskEdit && e.key === "Enter" && !e.shiftKey) {
      handleSubmit(onSubmit)();
    } else if (taskEdit && e.key === "Enter" && !e.shiftKey) {
      handleSubmit(onEdit)();
    }
  };

  const handleSelectCategory = (e) => {
    if (e.target.value === "add-new-cat") {
      alert("Doesn't work yet...");
    }
  };

  function doLaterAction(e) {
    console.log("do later event", e);
    // handleSubmit(onSubmit)();
  }

  return (
    <FormProvider>
      <div className="new-task">
        <h2 className="no-tasks no-tasks-bigger">
          {taskEdit ? "Edit this task..." : "Add something to do..."}
        </h2>

        <form
          className="new-task-form"
          onSubmit={taskEdit ? handleSubmit(onEdit) : handleSubmit(onSubmit)}
        >
          <textarea
            className="textarea task-input"
            type="text"
            placeholder="Add a new task..."
            name="task"
            rows="3"
            defaultValue={taskEdit ? thisTask.task : undefined}
            onKeyPress={handleUserKeyPress}
            ref={(e) => {
              register(e, { required: true, max: 140, min: 1, maxLength: 600 });
              ref.current = e;
            }}
            required
          />
          <h3 className="form-h3">Color:</h3>
          <div className="form-radio-btns">
            <span data-color="default" className="form-radio">
              <input
                name="color"
                type="radio"
                value="0"
                ref={register}
                defaultChecked
              />
              <span data-color="default" className="form-label cat-0"></span>
            </span>
            {colors.map((c) => {
              return (
                <span key={c.name} className="form-radio">
                  <input
                    name="color"
                    type="radio"
                    value={c.value}
                    ref={register}
                  />
                  <span className={c.class} data-color={c.name}></span>
                </span>
              );
            })}
          </div>
          {!showOptions || taskEdit ? (
            <div>
              <h3 className="form-h3">Motivation (optional):</h3>
              <input
                className="task-input"
                autoComplete="off"
                type="text"
                defaultValue={taskEdit ? thisTask.motivation : ""}
                onKeyPress={handleUserKeyPress}
                placeholder="Motivation €300, a trip to Italy, avoid a punch in the face..."
                name="motivation"
                ref={register({ maxLength: 420 })}
              />

              <h3 className="form-h3">Category (optional):</h3>
              <div className="form-category">
                <select
                  className="task-input cat-select"
                  name="category"
                  ref={register}
                  onChange={handleSelectCategory}
                >
                  {fetchedCategories.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                  <option value="add-new-cat">+ Add a new category</option>
                </select>
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
                size={isMobile ? "mobile" : "large-icon"}
              />
            </div>
            <div className="task-btns-right">
              {taskEdit ? (
                <ButtonSmall
                  onClick={() => {
                    handleSubmit(onEdit)();
                  }}
                  title="Save edited"
                  color="red"
                  size={isMobile ? "mobile" : "large-icon"}
                />
              ) : (
                <React.Fragment>
                  <ButtonSmall
                    onClick={() => {
                      doLaterAction();
                    }}
                    title="Do later"
                    color="grey"
                    size={isMobile ? "mobile" : "large-icon"}
                    icon={turtleIcon}
                  />
                  <ButtonSmall
                    // onClick={handleSubmit(onSubmit())}
                    type="submit"
                    title="Do today"
                    color="red"
                    size={isMobile ? "mobile" : "large-icon"}
                    icon={quickIcon}
                  />
                </React.Fragment>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="new-task-cover">
        {showKeyboardTip && showTip && !taskEdit ? (
          <p className="form-tip">
            Tip: Press "N" or "Shift+N" to open this form with your keyboard.
          </p>
        ) : null}
      </div>
    </FormProvider>
  );
}

export default TaskAdd;
