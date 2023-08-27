import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function NavItems() {
  return (
    <>
      <div className="Header">
        <div id="headContent">
          <div className="btnContainer">
            <Link to="/add-client">
              <Button variant="primary" size="lg" className="viewHoursBtns">
                Add New Client
              </Button>
            </Link>
            <Link to="/add-hours">
              <Button variant="primary" size="lg" className="viewHoursBtns">
                Add Hours
              </Button>
            </Link>
            <Link to="/view-hours">
              <Button variant="primary" size="lg" className="viewHoursBtns">
                View Hours
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavItems;
