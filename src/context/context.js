import React from "react";
import { fetchedTasks, deletedTask, mainTask } from "./tasks";

export const TasksContext = React.createContext({
  tasks: fetchedTasks,
  deletedTask: deletedTask,
  justDeleted: false,
  user: "guest",
  currentTask: mainTask,
  mainTaskMovement: "in",
});
