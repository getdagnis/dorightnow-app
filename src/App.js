import "./App.css";
import { Topbar } from "./components/Topbar/Topbar";
import { LeftSide } from "./components/LeftSide/LeftSide";

function App() {
  return (
    <div className="App">
      <Topbar />
      <LeftSide />
      <div className="main-task">
        <h1 className="empty-h1">you have nothing to do...</h1>
        <h3 className="empty-h3">choose a new task to do!</h3>
      </div>
    </div>
  );
}

export default App;
