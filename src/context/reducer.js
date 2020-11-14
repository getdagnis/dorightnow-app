import uuid from "uuid";

export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      const newTask = {
        id: uuid.v4(),
        task: action.payload.task,
        type: "todo",
        category: action.payload.category,
        motivation: action.payload.motivation,
        color: action.payload.color,
      };

      const addedTasks = [...state.tasks, newTask];

      localStorage.setItem("dorightnowTasks", JSON.stringify(addedTasks));

      return {
        ...state,
        tasks: addedTasks,
      };
    case "DELETE_TASK":
      const deletedTasks = state.tasks.filter((t) => t.id !== action.payload);

      return {
        ...state,
        tasks: deletedTasks,
      };
    case "SET_CURRENT_TASK":
      return {
        ...state,
        currentTask: action.payload,
      };
    case "UPDATE_TASK":
      const updatedTask = {
        ...state.currentTask,
        text: action.payload,
      };

      const updatedTasksIndex = state.tasks.findIndex(
        (note) => note.id === state.currentTask.id
      );

      const updatedTasks = [
        ...state.tasks.slice(0, updatedTasksIndex),
        updatedTask,
        ...state.tasks.slice(updatedTasksIndex + 1),
      ];

      return {
        currentTask: null,
        tasks: updatedTasks,
      };
    default:
      return state;
  }
}
