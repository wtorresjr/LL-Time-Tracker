import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

function NavItems() {
  return (
    <div id="navPadding">
      <NavLink to="/add-client">
        <Button variant="warning" size="lg">
          Add Client
        </Button>
      </NavLink>
      <NavLink to="/add-hours">
        <Button variant="warning" size="lg">
          Add Hours
        </Button>
      </NavLink>
      <NavLink to="/view-hours">
        <Button variant="warning" size="lg">
          View Hours
        </Button>
      </NavLink>
    </div>
  );
}

export default NavItems;
