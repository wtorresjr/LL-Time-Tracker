import { Link } from "react-router-dom";

function LoginPrompt() {
  return (
    <div className="Header">
      <h1>Lantern Learning Login</h1>
      <div id="headContent">
        <input name="credential"></input>
        <input type="password" name="password" id="pwd"></input>
        <Link to="/employeeOpts">
          <button id="loginBtn">LOGIN</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPrompt;
