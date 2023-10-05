import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHours } from "../store/hoursReducer";
import { fetchClientList, fetchClients } from "../store/clientReducer";

const ViewHours = () => {
  const dispatch = useDispatch();
  const [selectedClient, setSelectedClient] = useState("");
  const sessionUser = useSelector((state) => state?.session?.user);
  const userHours = useSelector((state) => state?.userHours);
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
    </div>
  );
};

export default ViewHours;
