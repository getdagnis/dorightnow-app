import React, { useContext, useRef, useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import firebaseAnalytics from "../../App.js";

import { TasksContext } from "../../context/context";
import "./TaskAdd.css";
import turtleIcon from "./turtle.svg";
import quickIcon from "./quick.svg";
import ButtonSmall from "../ButtonSmall/ButtonSmall";

function TaskAdd(props) {
  let { clickHandle, taskEdit, thisTask, showTip } = props;
  const { dispatch } = useContext(TasksContext);
  const [showOptions, setShowOptions] = useState(false);

  const showKeyboardTip =
    localStorage.getItem("showKeyboardTip") === "off" ? false : false; // TURNED OFF!!! FOR NOW...

  useEffect(() => {
    firebaseAnalytics.logEvent({ eventName: "create_task_opened" });
  });

  let ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

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
          />
          {showOptions || taskEdit ? (
            <div>
              <h3 className="form-h3">Motivation to finish (optional):</h3>
              <input
                className="task-input"
                autoComplete="off"
                type="text"
                defaultValue={taskEdit ? thisTask.motivation : ""}
                onKeyPress={handleUserKeyPress}
                placeholder="Motivation – €300, a trip to Italy, avoid a punch in the face..."
                name="motivation"
                ref={register({ maxLength: 420 })}
              />
              <h3 className="form-h3">Select a category (optional):</h3>
              <div className="form-category">
                <select
                  className="task-input cat-select"
                  name="category"
                  ref={register}
                >
                  <option value="none">None</option>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="andis">Friends & Family</option>
                </select>
                <div className="new-cat">Create New</div>
              </div>
              <h3 className="form-h3">Select a color (optional):</h3>
              <div className="form-radio-btns">
                <span data-color="default" className="form-radio cat-0">
                  <input
                    name="color"
                    type="radio"
                    value="0"
                    ref={register}
                    defaultChecked
                  />
                </span>
                <span data-color="teal" className="form-radio cat-a">
                  <input name="color" type="radio" value="a" ref={register} />
                </span>
                <span data-color="olive" className="form-radio cat-b">
                  <input name="color" type="radio" value="b" ref={register} />
                </span>
                <span data-color="apricot" className="form-radio cat-c">
                  <input name="color" type="radio" value="c" ref={register} />
                </span>
                <span data-color="gold" className="form-radio cat-d">
                  <input name="color" type="radio" value="d" ref={register} />
                </span>
                <span data-color="purple" className="form-radio cat-e">
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
              {taskEdit ? (
                <ButtonSmall
                  onClick={() => {
                    handleSubmit(onEdit)();
                  }}
                  title="Save edited"
                  color="red"
                  size={isMobile ? "mobile" : "large"}
                />
              ) : (
                <React.Fragment>
                  <ButtonSmall
                    onClick={() => {
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
