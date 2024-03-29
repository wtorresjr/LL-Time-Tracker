import { Route, Switch } from "react-router-dom";
import LoginPrompt from "./components/LoginPrompt.js";
import EmployeeOptions from "./components/EmployeeOptions.js";
import AddHours from "./components/AddHours.js";
import AddNewClient from "./components/AddNewClient.js";
import ViewHours from "./components/ViewHours.js";
import * as sessionActions from "./store/session";
import "./styles/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ManageClients from "./components/ManageClients.js";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min.js";
import React, { useEffect } from "react";
import SignupForm from "../src/components/SignUpForm.js";
import AdminViewHours from "./components/AdminViewHours.js";

function App() {
  const sessionUser = useSelector((state) => state?.session?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);

  return (
    <div className="contentContainer">
      {sessionUser && <EmployeeOptions />}
      <Switch>
        <Route exact path="/">
          <LoginPrompt />
        </Route>
        <Route exact path="/SignupNewEmployee">
          <SignupForm />
        </Route>
        <Route exact path="/add-client">
          {(sessionUser && <AddNewClient />) || (
            <h1>
              <NavLink to="/">Log In</NavLink>
            </h1>
          )}
        </Route>
        <Route exact path="/manage-clients">
          {(sessionUser && <ManageClients />) || (
            <h1>
              <NavLink to="/">Log In</NavLink>
            </h1>
          )}
        </Route>
        <Route exact path="/add-hours">
          {(sessionUser && <AddHours />) || (
            <h1>
              <NavLink to="/">Log In</NavLink>
            </h1>
          )}
        </Route>
        <Route exact path="/view-hours">
          {(sessionUser && <ViewHours />) || (
            <h1>
              <NavLink to="/">Log In</NavLink>
            </h1>
          )}
        </Route>
        <Route exact path="/admin-hours">
          {(sessionUser && sessionUser?.is_admin && <AdminViewHours />) || (
            <h1>
              <NavLink to="/">Log In</NavLink>
            </h1>
          )}
        </Route>
        <Route>
          <h1>Page Couldn't Be Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
