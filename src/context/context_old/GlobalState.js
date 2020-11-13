import { createContext } from "react";
import { fetchedTasks } from "./tasks";

const initialState = {
  tasks: fetchedTasks,
  user: "guest",
};

function stateFunction(state, action) {}
