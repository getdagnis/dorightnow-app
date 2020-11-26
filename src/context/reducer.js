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
        timeAdded: action.payload.timeAdded,
        timeModified: action.payload.timeAdded,
        timeSpent: { hours: 0, minutes: 0 },
      };

      console.log("🚨 PAYLOAD DATA:", action.payload);

      const addedTasks = [...state.tasks, newTask];

      localStorage.setItem("dorightnowTasks", JSON.stringify(addedTasks));

      return {
        ...state,
        tasks: addedTasks,
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
      currentTask.color =
        action.payload.data.color.length > 0
          ? action.payload.data.color
          : currentTask.color;
      currentTask.category =
        action.payload.data.category.length > 0
          ? action.payload.data.category
          : currentTask.category;

      const updatedTasks = [
        ...state.tasks.slice(0, updatedTasksIndex),
        currentTask,
        ...state.tasks.slice(updatedTasksIndex + 1),
      ];

      localStorage.setItem("dorightnowTasks", JSON.stringify(updatedTasks));

      return {
        ...state,
        tasks: updatedTasks,
      };

    case "UPDATE_TASK_LIST":
      const incomingTasks = action.payload;
      localStorage.setItem("dorightnowTasks", JSON.stringify(incomingTasks));

      return {
        ...state,
        tasks: incomingTasks,
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
      let currentTaskTemporary =
        action.payload === "keep" ? state.currentTask : null;

      return {
        ...state,
        currentTask: currentTaskTemporary,
        mainTaskMovement: "out",
      };

    case "MAIN_TASK_DONE":
      let newTasks = [];

      if (
        action.payload.action === "done" ||
        action.payload.action === "todo"
      ) {
        const newType = action.payload.action;
        const thisTaskIndex = state.tasks.findIndex(
          (t) => t.id === action.payload.taskId
        );

        let mainTaskDone = state.tasks[thisTaskIndex];
        mainTaskDone.type = newType;

        localStorage.setItem("dorightnowTasks", JSON.stringify(state.tasks));

        newTasks = [
          ...state.tasks.slice(0, thisTaskIndex),
          ...state.tasks.slice(thisTaskIndex + 1),
          mainTaskDone,
        ];
      }

      localStorage.setItem("mainTask", JSON.stringify(null));

      return {
        ...state,
        tasks: newTasks.length > 0 ? newTasks : state.tasks,
        mainTaskMovement: "done",
        currentTask: null,
      };

    case "HIDE_LEFT_SIDE":
      let newLeftHideSate = "";
      switch (action.payload) {
        case "hide":
          newLeftHideSate = true;
          break;
        case "show":
          newLeftHideSate = false;
          break;
        case "toggle":
          newLeftHideSate = !state.hideLeftSide;
          break;
        default:
          newLeftHideSate = false;
      }

      return {
        ...state,
        hideLeftSide: newLeftHideSate,
      };

    case "HIDE_RIGHT_SIDE":
      let newRightHideSate = "";
      switch (action.payload) {
        case "hide":
          newRightHideSate = true;
          break;
        case "show":
          newRightHideSate = false;
          break;
        case "toggle":
          newRightHideSate = !state.hideRightSide;
          break;
        default:
          newRightHideSate = false;
      }

      return {
        ...state,
        hideRightSide: newRightHideSate,
      };

    case "SET_LAST_COLOR":
      return { ...state, lastColor: action.payload };

    case "SET_LAST_CATEGORY":
      return { ...state, lastCategory: action.payload };

    // DEV USE ONLY
    case "CLEAN_CORRUPT_TASKS":
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
