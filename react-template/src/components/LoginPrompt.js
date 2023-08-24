import "../styles/loginpage.css";

function LoginPrompt() {
  return (
    <div>
      <h1>Lantern Learning Login</h1>
      <span className="fullWidth">
        <input name="credential"></input>
      </span>

      <span className="fullWidth">
        <input name="password"></input>
      </span>
      <button id="loginBtn">LOGIN</button>
    </div>
  );
}

export default LoginPrompt;
