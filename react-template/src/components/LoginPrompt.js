import { Link } from "react-router-dom";

function LoginPrompt() {
  return (
    <div id="loginPageDiv">
      <h1>Lantern Learning Login</h1>
      <span className="fullWidth">
        <input name="credential"></input>
      </span>

      <span className="fullWidth">
        <input type="password" name="password" id="pwd"></input>
      </span>
      <Link to="/employeeOpts">
        <button id="loginBtn">LOGIN</button>
      </Link>
    </div>
  );
}

export default LoginPrompt;
