import "./App.css";
import { Topbar } from "./components/Topbar/Topbar";
import Sides from "./components/Sides/Sides";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { tasks, done } from "./tasks";

function App() {
  let chooseOrCreate =
    tasks.length > 0 ? "Choose" : <Link to="/create">Create</Link>;
  console.log("tasks", tasks);

  localStorage.setItem("dorightnowTasks", JSON.stringify(tasks));
  return (
    <Router>
      <div className="App">
        <Topbar />
        <Switch>
          <Route path="/">
            <div className="wrapper">
              <div className="main-task">
                <h1 className="empty-h1">You have nothing to do...</h1>
                <h3 className="empty-h3">{chooseOrCreate} a new task to do!</h3>
              </div>
              <Sides tasks={tasks} done={done} />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
