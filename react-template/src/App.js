// import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import LoginPrompt from "./components/LoginPrompt.js";
import MainPage from "./components/MainPage.js";

function App() {
  return (
    <div className="App">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/login">
          <LoginPrompt />
        </Route>
        <Route>
          <h1>Page Couldn't Be Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
