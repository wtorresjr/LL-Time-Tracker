import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminViewAccordion from "./Accordions/AdminViewAccordion";
import { getAdminHours } from "../store/hoursReducer";
import Alert from "react-bootstrap/Alert";

const AdminViewHours = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);
  const employeeHours = useSelector(
    (state) => state?.hoursReducer?.allEmployeeHours?.employeeHours
  );
  const allPay = useSelector(
    (state) => state?.hoursReducer?.allEmployeeHours?.Owed_To_Employees
  );
  const billHours = useSelector(
    (state) => state?.hoursReducer?.allEmployeeHours?.Hours_To_Bill
  );
  const avgTechCost = useSelector(
    (state) => state?.hoursReducer?.allEmployeeHours?.Avg_Tech_Cost
  );

  let adminView = [];

  useEffect(() => {
    const fetchData = async () => {
      if (sessionUser.is_admin === true) {
        adminView = await dispatch(getAdminHours());
      }
    };
    fetchData();
  }, [dispatch, sessionUser]);

  return (
    <div className="generalContainer">
      <div className="titleHeaders">
        <h1>Admin View Hours</h1>
      </div>
      <form>
        {(adminView && (
          <>
            <Alert variant="success" id="allClientPayDiv">
              <i
                className="fa-solid fa-sack-dollar fa-2xl"
                id="iconPadding"
              ></i>
              <div style={{ textAlign: "center" }}>
                <p>All Employees Earnings: ${parseFloat(allPay)}</p>
                <p>Hours To Bill: {parseFloat(billHours)}</p>
                <p>Average Tech Cost: ${parseFloat(avgTechCost)}</p>
              </div>
              <i
                className="fa-solid fa-sack-dollar fa-2xl"
                id="iconPadding"
              ></i>
            </Alert>
            <AdminViewAccordion employeeHours={employeeHours} />
          </>
        )) ||
          (!adminView && (
            <h3 style={{ textAlign: "center", margin: "20px 0 0 0" }}>
              You currently have no hours logged.
            </h3>
          ))}
      </form>
    </div>
  );
};

export default AdminViewHours;
