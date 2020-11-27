import React from "react";
import {
  fetchedTasks,
  fetchedCategories,
  deletedTask,
  fetchedColors,
} from "./tasks";

export const TasksContext = React.createContext({
  tasks: fetchedTasks,
  categories: fetchedCategories,
  colors: fetchedColors,
  deletedTask: deletedTask,
  justDeleted: false,
  user: "guest",
  currentTask: null,
  lastColor: null,
  lastCategory: null,
  hideLeftSide: false,
  hideRightSide: false,
});

export const UserContext = React.createContext({
  user: "guest",
  settings: [],
  tasks: [],
  categories: [],
  followers: [],
  following: [],
  leaderboardPoints: [],
});
