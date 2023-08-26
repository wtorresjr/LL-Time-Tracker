import { Route, Switch } from "react-router-dom";
import LoginPrompt from "./components/LoginPrompt.js";
import EmployeeOptions from "./components/EmployeeOptions.js";
import "./styles/app.css";
import MainDisplay from "./components/MainDisplay.js";

function App() {
  return (
    <>
      <div className="Header">
          <Switch>
            <Route exact path="/">
              <LoginPrompt />
            </Route>
            <Route path="/employeeOpts">
              <EmployeeOptions />
              <MainDisplay />
            </Route>
            <Route>
              <h1>Page Couldn't Be Found</h1>
            </Route>
          </Switch>
      </div>
    </>
  );
}

export default App;
