import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import { useState } from "react";

function LoginPrompt() {
  // const [credential, setCredential] = useState("");
  // const [password, setPassword] = useState("");

  return (
    <>
      <form>
        <Container className="contentContainer" fluid="md">
          <h1>Lantern Learning Login</h1>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Email</InputGroup.Text>
            <Form.Control
              aria-label="Email"
              aria-describedby="inputGroup-sizing-sm"
              // value={credential}
              // onChange={(e) => setCredential(e.target.value)}
            />
          </InputGroup>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Password
            </InputGroup.Text>
            <Form.Control
              aria-label="password"
              aria-describedby="inputGroup-sizing-sm"
              type="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          <Link to="/view-hours">
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                Login
              </Button>
            </div>
          </Link>
        </Container>
      </form>
    </>
  );
}

export default LoginPrompt;
