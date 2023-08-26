import { Link } from "react-router-dom";

function NavItems() {
  return (
    <>
      <div className="Header">
        <div id="headContent">
          <Link to="/add-client">
            <button>Add New Client</button>
          </Link>
          <Link to="/add-hours">
            <button>Add Hours</button>
          </Link>
          <Link to="/view-hours">
            <button>View Hours</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavItems;
