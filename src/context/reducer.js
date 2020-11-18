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
        list: action.payload.list || "today",
      };

      const addedTasks = [...state.tasks, newTask];

      localStorage.setItem("dorightnowTasks", JSON.stringify(addedTasks));

      return {
        ...state,
        tasks: addedTasks,
      };

    case "DELETE_TASK":
      const nondeletedTasks = state.tasks.filter(
        (t) => t.id !== action.payload
      );
      const deletedTask = state.tasks.filter((t) => t.id === action.payload)[0];
      localStorage.setItem("dorightnowTasks", JSON.stringify(nondeletedTasks));
      localStorage.setItem("deletedTask", JSON.stringify(deletedTask));

      return {
        ...state,
        tasks: nondeletedTasks,
        deletedTask: deletedTask,
        justDeleted: true,
      };

    case "UNDELETE_TASK":
      const lastDeletedTask = state.deletedTask;
      const restoredTasks = [...state.tasks, lastDeletedTask];
      localStorage.setItem("dorightnowTasks", JSON.stringify(restoredTasks));

      return {
        ...state,
        tasks: restoredTasks,
        justDeleted: false,
      };

    case "REMOVE_JUSTDELETED":
      return {
        ...state,
        justDeleted: false,
      };

    case "SET_MAIN_TASK":
      const currentTaskId = action.payload;
      localStorage.setItem("mainTask", JSON.stringify(currentTaskId));

      return {
        ...state,
        mainTaskMovement: "in",
        currentTask: currentTaskId,
      };

    case "CLEAR_MAIN_TASK":
      return {};

    case "MAIN_TASK_DONE":
      let newTasks = [];

      if (action.payload.action === "done") {
        const newType = "done";
        const thisTaskIndex = state.tasks.findIndex(
          (t) => t.id === action.payload.taskId
        );

        let mainTaskDone = state.tasks[thisTaskIndex];
        mainTaskDone.type = newType;

        localStorage.setItem("dorightnowTasks", JSON.stringify(state.tasks));

        newTasks = [
          ...state.tasks.slice(0, thisTaskIndex),
          mainTaskDone,
          ...state.tasks.slice(thisTaskIndex + 1),
        ];
      }

      localStorage.setItem("mainTask", JSON.stringify(null));

      return {
        ...state,
        tasks: newTasks.length > 0 ? newTasks : state.tasks,
        mainTaskMovement: "done",
        currentTask: null,
      };

    case "UPDATE_TASK":
      const updatedTasksIndex = state.tasks.findIndex(
        (t) => t.id === action.payload.taskId
      );
      const currentTask = state.tasks[updatedTasksIndex];
      currentTask.task =
        action.payload.data.task.length > 0
          ? action.payload.data.task
          : currentTask.task;
      currentTask.motivation =
        action.payload.data.motivation.length > 0
          ? action.payload.data.motivation
          : currentTask.motivation;

      const updatedTasks = [
        ...state.tasks.slice(0, updatedTasksIndex),
        currentTask,
        ...state.tasks.slice(updatedTasksIndex + 1),
      ];

      localStorage.setItem("dorightnowTasks", JSON.stringify(updatedTasks));

      return {
        tasks: updatedTasks,
      };

    case "CLEANUP_TASKS":
      const cleanedTasks = state.tasks.filter((t) => t.id && t.id.length > 1);
      localStorage.setItem("dorightnowTasks", JSON.stringify(cleanedTasks));

      return {
        ...state,
        tasks: cleanedTasks,
      };
    default:
      return state;
  }
}
