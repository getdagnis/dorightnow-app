import React from "react";
import { fetchedTasks } from "./tasks";

export const TasksContext = React.createContext({
  tasks: fetchedTasks,
  user: "guest",
  currentTask: null,
  addTask: false,
});
