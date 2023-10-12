import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHours } from "../store/hoursReducer";
import { fetchClientList } from "../store/clientReducer";
import ViewHoursAccordion from "./Accordions/ViewHoursAccordion";
import Alert from "react-bootstrap/Alert";

const ViewHours = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);
  const userHrs = useSelector(
    (state) => state?.hoursReducer?.userHours?.clients
  );
  const allPay = useSelector((state) => state?.hoursReducer?.userHours);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchHours(sessionUser?.id));
      await dispatch(fetchClientList(sessionUser?.id));
    };

    fetchData();
  }, [dispatch, sessionUser]);

  useEffect(() => {
    console.log("allPay.All_Client_Pay:", allPay?.All_Client_Pay);
  }, [allPay]);

  return (
    <div className="generalContainer">
      <div className="titleHeaders">
        <h1>Hours</h1>
      </div>
      <form>
        {(allPay && allPay?.All_Client_Pay !== 0 && (
          <Alert variant="success" id="allClientPayDiv">
            <i className="fa-solid fa-sack-dollar fa-2xl" id="iconPadding"></i>
            <div style={{ textAlign: "center" }}>
              Current Pay (All Clients): ${allPay?.All_Client_Pay}
            </div>
            <i className="fa-solid fa-sack-dollar fa-2xl" id="iconPadding"></i>
          </Alert>
        )) ||
          !allPay ||
          (allPay?.All_Client_Pay == 0 && (
            <h3 style={{ textAlign: "center" }}>
              You currently have no hours logged.
            </h3>
          ))}
        <ViewHoursAccordion userHrs={userHrs} />
      </form>
    </div>
  );
};

export default ViewHours;
