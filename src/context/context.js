import React from "react";
import { fetchedTasks, fetchedCategories, deletedTask } from "./tasks";

console.log("fetchedCategories", fetchedCategories);

export const TasksContext = React.createContext({
  categories: fetchedCategories,
  tasks: fetchedTasks,
  deletedTask: deletedTask,
  justDeleted: false,
  user: "guest",
  currentTask: null,
  mainTaskMovement: "in",
  hideLeftSide: false,
  hideRightSide: false,
});
