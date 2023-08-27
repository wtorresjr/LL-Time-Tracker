import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function LoginPrompt() {
  return (
    <div className="Header">
      <h1>Lantern Learning Login</h1>
      <div id="headContent">
        <input name="credential" placeholder="Email Address"></input>
        <input type="password" name="password" id="pwd" placeholder="Password"></input>
        <Link to="/employeeOpts">
          <Button variant="primary">LOGIN</Button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPrompt;
