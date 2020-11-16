import React from "react";
import { fetchedTasks, deletedTask } from "./tasks";

export const TasksContext = React.createContext({
  tasks: fetchedTasks,
  deletedTask: deletedTask,
  justDeleted: false,
  user: "guest",
  currentTask: null,
});
