import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";

function LoginPrompt() {
  return (
    <>
      <form>
        <Container className="contentContainer" fluid="md">
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Email</InputGroup.Text>
            <Form.Control aria-label="Email" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Password</InputGroup.Text>
            <Form.Control aria-label="Email" aria-describedby="inputGroup-sizing-sm"/>
          </InputGroup>
          <Link to="/employeeOpts">
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
