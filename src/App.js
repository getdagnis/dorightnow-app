import React, { useReducer, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import HomePage from "./containers/Home/Home";
import SettingsPage from "./containers/Settings/Settings";
import AccountPage from "./containers/Account/Account";
import AboutPage from "./containers/About/About";
import ContactsPage from "./containers/Contacts/Contacts";
import FollowingPage from "./containers/Following/Following";

import { TasksContext } from "./context/context";
import tasksReducer from "./context/reducer";

function App() {
  const initialState = useContext(TasksContext);
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  // DELETES ANY TASKS THAT DON'T HAVE AN ID (DEV MODE USAGE)
  // useEffect(() => {
  //   dispatch({ type: "CLEANUP_TASKS" });
  // });

  console.log(
    "local storage tasks",
    JSON.parse(localStorage.getItem("dorightnowTasks"))
  );

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className="App">
          <Topbar />
          <Switch>
            <Route path="/following" component={FollowingPage} />
            <Route path="/contacts" component={ContactsPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route exact path="/" component={HomePage}></Route>
          </Switch>
        </div>
      </Router>
    </TasksContext.Provider>
  );
}

export default App;
