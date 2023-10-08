import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { logout } from "../store/session";

function NavItems() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const sessionUser = useSelector((state) => state?.session?.user);
  const [expanded, setExpanded] = useState(false);

  const handleNavItemClick = () => {
    setExpanded(false);
  };

  const logUserOut = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => history.push("/"));
  };

  return (
    <div className="navBarStyle">
      <Navbar
        expanded={expanded}
        expand="true"
        className="bg-body-tertiary"
        collapseOnSelect
      >
        <Container>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Navbar.Brand href="#home">Lantern Learning</Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setExpanded(!expanded)}
              style={{ right: "10px", top: "10px", position: "absolute" }}
            />
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to="/"
                onClick={logUserOut}
                className="navItemLinks"
                style={{ color: "red" }}
              >
                Log Out
              </NavLink>
              <NavLink
                to="/add-hours"
                className="navItemLinks"
                onClick={handleNavItemClick}
              >
                Add Hours
              </NavLink>
              <NavLink
                to="/view-hours"
                className="navItemLinks"
                onClick={handleNavItemClick}
              >
                View Hours
              </NavLink>
              <NavLink
                to="/add-client"
                className="navItemLinks"
                onClick={handleNavItemClick}
              >
                Add New Client
              </NavLink>
              <NavLink
                to=""
                onClick={(e) => alert("Feature Coming Soon...")}
                className="navItemLinks"
              >
                Manage Clients
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavItems;
