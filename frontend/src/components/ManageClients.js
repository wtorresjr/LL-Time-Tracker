import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHours } from "../store/hoursReducer";
import { fetchClientList } from "../store/clientReducer";
import ManageClientsAccordion from "./Accordions/ManageClientsAccordion";

const ManageClients = () => {
  const dispatch = useDispatch();
  const userClients = useSelector(
    (state) => state?.clientList?.clients?.clients
  );

  useEffect(() => {
    dispatch(fetchClientList());
  }, [dispatch]);

  return (
    <div className="generalContainer">
      <div className="titleHeaders">
        <h1>Manage Clients</h1>
      </div>
      <form>
        <ManageClientsAccordion userClients={userClients} />
      </form>
    </div>
  );
};

export default ManageClients;
