import React, { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./TaskList.css";
import Task from "../Task/Task";
import { TasksContext } from "../../context/context";

const TaskList = (props) => {
  const { listType } = props;
  const { dispatch, state } = useContext(TasksContext);
  let { tasks } = state;
  const thisListTasks = tasks.filter((t) => t.type === listType);
  const otherTasks = tasks.filter((t) => t.type !== listType);

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
    <DragDropContext onDragEnd={handleDragEnd}>
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
