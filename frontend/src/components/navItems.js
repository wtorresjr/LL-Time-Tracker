import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { logout } from "../store/session";

function NavItems() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state?.session?.user);

  const logUserOut = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => history.push("/"));
    console.log("Loggin user out");
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {sessionUser && (
          <button id="logOutBtn" onClick={logUserOut}>
            Log Out
          </button>
        )}
      </div>
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
    </>
  );
}

export default NavItems;
