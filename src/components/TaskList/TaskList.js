import React, { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./TaskList.css";
import Task from "../Task/Task";
import { TasksContext } from "../../context/context";

const TaskList = (props) => {
  const { listType } = props;
  const { dispatch, state } = useContext(TasksContext);
  let { tasks } = state;
  // TODO force lists to re-render when tasks have changed due to moving
  // const [tasksChanged, setTasksChanged] = useState(false);

  const thisListTasks = tasks.filter((t) => t.type === listType);
  const otherTasks = tasks.filter((t) => t.type !== listType);
  let draggedElementId = null;

  function handleDragStart(props) {
    draggedElementId = props.draggableId;
    console.log("🚀 handleDragStart ~ props", draggedElementId);

    window.addEventListener("mouseup", droppedOutside);
  }

  function droppedOutside(e) {
    if (
      e.target.parentElement.classList.contains("main-task-empty") ||
      e.target.classList.contains("main-task-empty")
    ) {
      console.log("🚨 dropped on main task!");
      console.log("🚀 handleDragStart ~ props", draggedElementId);
      dispatch({ type: "CLEAR_MAIN_TASK", payload: draggedElementId });

      setTimeout(() => {
        dispatch({ type: "SET_MAIN_TASK", payload: draggedElementId });
      }, 0);
      setTimeout(() => {
        dispatch({ type: "HIDE_LEFT_SIDE", payload: "hide" });
        dispatch({ type: "HIDE_RIGHT_SIDE", payload: "hide" });
      }, 500);
    }
    if (e.target.classList.contains("right-side-marker")) {
      console.log("🚨 dropped on RIGHT SIDE!");
      dispatch({
        type: "MAIN_TASK_DONE",
        payload: { taskId: draggedElementId, action: "done" },
      });
    }
    if (e.target.classList.contains("left-side-marker")) {
      console.log("🚨 dropped on LEFT SIDE!");
      dispatch({
        type: "MAIN_TASK_DONE",
        payload: { taskId: draggedElementId, action: "todo" },
      });
    }
    window.removeEventListener("mouseup", droppedOutside);
  }

  function handleDragEnd(result) {
    if (!result.destination) {
      console.log("result", result);

      return;
    }
    const [reorderedItem] = thisListTasks.splice(result.source.index, 1);
    thisListTasks.splice(result.destination.index, 0, reorderedItem);

    const newTasks = [...thisListTasks, ...otherTasks];
    console.log("🚀 ~ newTasks", newTasks);

    dispatch({ type: "UPDATE_TASK_LIST", payload: newTasks });
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {thisListTasks && thisListTasks.length > 0 ? (
        <Droppable droppableId={listType}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="task-list"
            >
              {thisListTasks.map((t, index) => {
                let delay = thisListTasks.indexOf(t) + 2;
                return (
                  <Draggable key={t.id} draggableId={t.id} index={index}>
                    {(provided) => (
                      <Task
                        delay={delay}
                        task={t}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        draggableRef={provided.innerRef}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : listType === "done" ? (
        <h3 className="no-tasks">Nothing done today</h3>
      ) : (
        <h3 className="no-tasks">No tasks added</h3>
      )}
    </DragDropContext>
  );
};

export default TaskList;
