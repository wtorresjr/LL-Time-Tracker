import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHours } from "../store/hoursReducer";
import { fetchClientList, fetchClients } from "../store/clientReducer";

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
  const userClients = useSelector(
    (state) => state?.clientList?.clients?.clients
  );

  useEffect(() => {
    dispatch(fetchHours(sessionUser?.id));
    dispatch(fetchClientList(sessionUser?.id));
  }, [dispatch, sessionUser]);

  useEffect(() => {
    console.log("Selected Client", selectedClient);
  }, [dispatch, selectedClient]);

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  return (
    <div className="viewHoursPage">
      <h1>View Hours Page</h1>
      <div className="clientSelectorDiv">
        <select
          value={selectedClient}
          onChange={handleClientChange}
          id="selectClient"
        >
          <option>Select Client</option>
          <option>All Clients</option>
          {userClients?.map((client) => {
            return (
              <option key={client?.id} value={client?.id}>
                {client?.client_initials}
              </option>
            );
          })}
        </select>
        <button>Filter By Selected Client</button>
      </div>
      <div className="hoursListDiv">
        {allPay && (
          <h4 id="allPayForClient">Total Pay For All Clients: ${allPay}</h4>
        )}
        {userHrs?.map((hours) => {
          return (
            <div key={hours?.id} className="hoursContain">
              <div className="clientInfoDiv">
                <p>Client Initials: {hours?.client_initials}</p>
                <p>Hourly Rate: ${hours?.hourly_rate}</p>
              </div>
              {hours?.hoursworkeds?.map((day) => {
                return (
                  <div className="dayWorkedContain" key={day?.day_worked}>
                    Date:
                    <p>{day.day_worked}</p>
                    Hours: {day.total_hours}
                  </div>
                );
              })}
              <div className="totalPayContain">
                <p>Total Client Hours: {hours?.TotalClientHours}</p>
                <p>Total Pay: ${hours?.Total_Pay}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewHours;
