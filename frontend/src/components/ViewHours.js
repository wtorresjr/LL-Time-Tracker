import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHours } from "../store/hoursReducer";
import { fetchClientList } from "../store/clientReducer";
import ViewHoursAccordion from "./Accordions/ViewHoursAccordion";

const ViewHours = () => {
  const dispatch = useDispatch();
  const [selectedClient, setSelectedClient] = useState("");
  const sessionUser = useSelector((state) => state?.session?.user);
  const userHrs = useSelector(
    (state) => state?.hoursReducer?.userHours?.clients
  );
  const allPay = useSelector(
    (state) => state?.hoursReducer?.userHours?.All_Client_Pay
  );


  useEffect(() => {
    dispatch(fetchHours(sessionUser?.id));
    dispatch(fetchClientList(sessionUser?.id));
  }, [dispatch, sessionUser]);



  return (
    <div className="generalContainer">
      <div className="titleHeaders">
        <h1>View Hours Page</h1>
      </div>
      <form>
        {allPay && (
          <div id="allClientPayDiv">Total Pay (All Clients): ${allPay}</div>
        )}
        <ViewHoursAccordion userHrs={userHrs} allPay={allPay} />
      </form>
    </div>
  );
};

export default ViewHours;
