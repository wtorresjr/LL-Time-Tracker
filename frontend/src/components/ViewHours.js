import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHours } from "../store/hoursReducer";
import { fetchClientList } from "../store/clientReducer";
import ViewHoursAccordion from "./Accordions/ViewHoursAccordion";
import Alert from "react-bootstrap/Alert";

const ViewHours = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);
  const userHrs = useSelector((state) => state?.hoursReducer?.userHours);
  const allPay = useSelector(
    (state) => state?.hoursReducer?.userHours?.All_Client_Pay
  );


  const [allPayLoaded, setAllPayLoaded] = useState(
    allPay !== null && allPay !== undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchHours(sessionUser?.id));
      await dispatch(fetchClientList(sessionUser?.id));
      setAllPayLoaded(allPay !== 0);
    };
    fetchData();
  }, [dispatch, sessionUser, allPay]);

  // useEffect(() => {
  //   console.log("Redux State", userHrs);
  //   console.log("All_Client_Pay:", allPay);
  // }, [allPay, userHrs]);

  return (
    <div className="generalContainer">
      <div className="titleHeaders">
        <h1>Hours</h1>
      </div>
      <form>
        {(allPayLoaded && (
          <>
            <Alert variant="success" id="allClientPayDiv">
              <i
                className="fa-solid fa-sack-dollar fa-2xl"
                id="iconPadding"
              ></i>
              <div style={{ textAlign: "center" }}>
                Current Pay (All Clients): ${parseFloat(allPay)}
              </div>
              <i
                className="fa-solid fa-sack-dollar fa-2xl"
                id="iconPadding"
              ></i>
            </Alert>
            <ViewHoursAccordion userHrs={userHrs?.clients} />
          </>
        )) ||
          (!allPayLoaded && (
            <h3 style={{ textAlign: "center", margin: "20px 0 0 0" }}>
              You currently have no hours logged.
            </h3>
          ))}
      </form>
    </div>
  );
};

export default ViewHours;
