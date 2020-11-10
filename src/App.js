import "./App.css";
import { Topbar } from "./components/Topbar/Topbar";
import Sides from "./components/Sides/Sides";

import { tasks, done } from "./tasks";

function App() {
  return (
    <div className="App">
      <Topbar />

      <div className="wrapper">
        <div className="main-task">
          <h1 className="empty-h1">You have nothing to do...</h1>
          <h3 className="empty-h3">Choose a new task to do!</h3>
        </div>
        <Sides tasks={tasks} done={done} />
      </div>
    </div>
  );
}

export default App;
