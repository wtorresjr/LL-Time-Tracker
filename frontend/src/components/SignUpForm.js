import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpNewUser } from "../store/session";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import { NavLink, Redirect } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

function SignupForm() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/add-hours" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        signUpNewUser({
          email,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    } else {
      return setErrors({
        confirmPassword: "Passwords do not match. Please try again.",
      });
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
        <Container className="contentContainer" fluid="md">
          <h1>Lantern Learning Sign Up</h1>

          <FloatingLabel
            controlId="floatingInput1"
            label="Email address"
            className="genInputs"
          >
            <Form.Control
              style={{ backgroundColor: "#d5ebff" }}
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput2"
            label="First Name"
            className="genInputs"
          >
            <Form.Control
              style={{ backgroundColor: "#d5ebff" }}
              //   type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput3"
            label="Last Name"
            className="genInputs"
          >
            <Form.Control
              style={{ backgroundColor: "#d5ebff" }}
              //   type="text"
              placeholder="Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
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
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword2"
            label="Confirm Password"
            className="genInputs"
          >
            <Form.Control
              style={{ backgroundColor: "#d5ebff" }}
              type="password"
              placeholder="Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FloatingLabel>

          {errors &&
            (errors.errors ||
              errors.password ||
              errors.credential ||
              errors.confirmPassword ||
              errors.email) && (
              <h5
                style={{
                  textAlign: "center",
                  margin: "20px 0 20px 0",
                }}
              >
                <Alert variant="danger">
                  {errors.credential ||
                    errors.errors ||
                    errors.password ||
                    errors.confirmPassword ||
                    errors.email}
                </Alert>
              </h5>
            )}

          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" type="submit">
              Sign Up
            </Button>

            <div style={{ margin: "20px 0 0 0" }}>
              <NavLink to="/">Already have an account? Login</NavLink>
            </div>
          </div>
        </Container>
      </form>
    </div>
  );
}

export default SignupForm;
