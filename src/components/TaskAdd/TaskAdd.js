import React, { useContext, useRef, useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useForm, FormProvider } from "react-hook-form";

import { TasksContext } from "../../context/context";
import "./TaskAdd.css";
import turtleIcon from "./assets/turtle.svg";
import quickIcon from "./assets/quick.svg";
import ButtonSmall from "../ButtonSmall/ButtonSmall";

function TaskAdd(props) {
  let { clickHandle, taskEdit, thisTask, showTip } = props;
  const { state, dispatch } = useContext(TasksContext);
  const [showOptions, setShowOptions] = useState(true);
  const timeNow = new Date().getTime();

  const { categories, colors, lastColor, lastCategory } = state;

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
    data.task =
      data.task === "lipsum" || data.task === "lorem"
        ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare ipsum sit amet."
        : data.task === "lorem ipsum"
        ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare ipsum sit amet interdum finibus. Donec sollicitudin aliquam venenatis."
        : data.task === "lorem ipsum dolor"
        ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare ipsum sit amet interdum finibus. Donec sollicitudin aliquam venenatis. Praesent rutrum nunc ut mauris scelerisque, nec tincidunt odio aliquet."
        : data.task === "lorem ipsum dolor sit"
        ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare ipsum sit amet interdum finibus. Donec sollicitudin aliquam venenatis. Praesent rutrum nunc ut mauris scelerisque, nec tincidunt odio aliquet. Morbi dolor felis, lacinia id dignissim a, dignissim ac mauris donec ac urna pharetra."
        : data.task;
    console.log(data.task);
    dispatch({
      type: "ADD_TASK",
      payload: { ...data, timeAdded: timeNow, timeModified: timeNow },
    });
    dispatch({ type: "SET_LAST_COLOR", payload: data.color });
    dispatch({ type: "SET_LAST_CATEGORY", payload: data.category });
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
      alert("Sorry, doesn't work yet...");
    }
  };

  function doLaterAction(e) {
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
            {colors
              ? colors.map((c) => {
                  return (
                    <span key={c.name} className="form-radio">
                      <input
                        name="color"
                        type="radio"
                        value={c.value}
                        ref={register}
                        defaultChecked={
                          taskEdit
                            ? c.value === thisTask.color
                            : lastColor
                            ? c.value === lastColor
                            : c.value === "0"
                        }
                      />
                      <span className={c.class} data-color={c.name}></span>
                    </span>
                  );
                })
              : null}
          </div>
          {showOptions || taskEdit ? (
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
                  {categories
                    ? categories.map((c) => (
                        <option
                          key={c.name}
                          value={c.name}
                          selected={
                            taskEdit
                              ? c.name === thisTask.category
                              : lastCategory
                              ? c.name === lastCategory
                              : c.name === "None"
                          }
                        >
                          {c.name}
                        </option>
                      ))
                    : null}
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
