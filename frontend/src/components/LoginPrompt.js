import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import * as sessionActions from "../store/session";
import { useSelector } from "react-redux";

function LoginPrompt() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/add-hours" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
        <Container className="contentContainer" fluid="md">
          <h1>Lantern Learning Login</h1>

          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="genInputs"
          >
            <Form.Control
              style={{ backgroundColor: "#d5ebff" }}
              type="email"
              placeholder="name@example.com"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="genInputs"
          >
            <Form.Control
              style={{ backgroundColor: "#d5ebff" }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </FloatingLabel>

          {errors &&
            (errors.errors || errors.password || errors.credential) && (
              <h5
                style={{
                  textAlign: "center",
                  margin: "20px 0 20px 0",
                }}
              >
                <Alert variant="danger">
                  {errors.credential || errors.errors || errors.password}
                </Alert>
              </h5>
            )}

          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" type="submit">
              Login
            </Button>
          </div>
          <div style={{ margin: "20px 0 0 0" }}>
            <NavLink to="/signupnewemployee">Sign Up</NavLink>
          </div>
        </Container>
      </form>
    </div>
  );
}

export default LoginPrompt;
