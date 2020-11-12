import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import HomePage from "./containers/Home/Home";
import SettingsPage from "./containers/Settings/Settings";
import AccountPage from "./containers/Account/Account";
import AboutPage from "./containers/About/About";
import ContactsPage from "./containers/Contacts/Contacts";

import { tasks, done } from "./tasks";

function App() {
  localStorage.setItem("dorightnowTasks", JSON.stringify(tasks));
  return (
    <Router>
      <div className="App">
        <Topbar />
        <Switch>
          <Route path="/contacts">
            <ContactsPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/account">
            <AccountPage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/">
            <HomePage tasks={tasks} done={done} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
