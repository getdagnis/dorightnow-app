import { ADD_TASK, DELETE_TASK, EDIT_TASK } from "./actions";
import { fetchedTasks } from "./tasks";

const initialState = {
  tasks: fetchedTasks,
  user: "dagnis",
};

const taskReducer = (state = initialState, action) => {
  let updatedTasks;
  let updatedTaskIndex;
  switch (action.type) {
    case ADD_TASK:
      updatedTasks = [...state.tasks];
      updatedTaskIndex = updatedTasks.findIndex(
        (t) => t.id === action.payload.id
      );

      if (updatedTaskIndex < 0) {
        updatedTasks.push({ ...action.payload, quantity: 1 });
      } else {
        const updatedTask = {
          ...updatedTasks[updatedTaskIndex],
        };
        updatedTask.quantity++;
        updatedTasks[updatedTaskIndex] = updatedTask;
      }
      return { ...state, tasks: updatedTasks };

    case DELETE_TASK:
      updatedTasks = [...state.tasks];
      updatedTaskIndex = updatedTasks.findIndex((t) => t.id === action.payload);

      const updatedTask = {
        ...updatedTasks[updatedTaskIndex],
      };
      updatedTask.quantity--;
      if (updatedTask.quantity <= 0) {
        updatedTasks.splice(updatedTaskIndex, 1);
      } else {
        updatedTasks[updatedTaskIndex] = updatedTask;
      }

      return { ...state, tasks: updatedTasks };
    default:
      return state;
  }
};

export default taskReducer;
