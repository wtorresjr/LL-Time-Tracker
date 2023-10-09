import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { logout } from "../store/session";

function NavItems() {
  const dispatch = useDispatch();
  const history = useHistory();
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
                <i className="fa-solid fa-right-from-bracket fa-xl"></i>
                Log Out
                <i className="fa-solid fa-right-from-bracket fa-xl"></i>
              </NavLink>
              <NavLink
                to="/add-hours"
                className="navItemLinks"
                onClick={handleNavItemClick}
              >
                <i className="fa-regular fa-clock fa-xl"></i>
                Add Hours
                <i className="fa-regular fa-clock fa-xl"></i>
              </NavLink>
              <NavLink
                to="/view-hours"
                className="navItemLinks"
                onClick={handleNavItemClick}
              >
                <i className="fa-solid fa-list-check fa-xl"></i>
                View Hours
                <i className="fa-solid fa-list-check fa-xl"></i>
              </NavLink>
              <NavLink
                to="/add-client"
                className="navItemLinks"
                onClick={handleNavItemClick}
              >
                <i className="fa-solid fa-address-card fa-xl"></i>
                Add New Client
                <i className="fa-solid fa-address-card fa-xl"></i>
              </NavLink>
              <NavLink
                to="/manage-clients"
                onClick={handleNavItemClick}
                className="navItemLinks"
              >
                <i className="fa-regular fa-address-book fa-xl"></i>
                Manage Clients
                <i className="fa-regular fa-address-book fa-xl"></i>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavItems;
