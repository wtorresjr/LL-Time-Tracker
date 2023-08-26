import { Route, Switch } from "react-router-dom";
import LoginPrompt from "./components/LoginPrompt.js";
import EmployeeOptions from "./components/EmployeeOptions.js";
import AddHours from "./components/AddHours.js";
import AddNewClient from "./components/AddNewClient.js";
import ViewHours from "./components/ViewHours.js";
import "./styles/app.css";

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
            <AddHours />
          </Route>
          <Route exact path="/add-client">
            <EmployeeOptions />
            <AddNewClient />
          </Route>
          <Route exact path="/add-hours">
            <EmployeeOptions />
            <AddHours />
          </Route>
          <Route exact path="/view-hours">
            <EmployeeOptions />
            <ViewHours />
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
