import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import DeleteClientModal from "../OpenModalButton/DeleteClientModal";
import "../../styles/app.css";
import { useDispatch } from "react-redux";

function ManageClientsAccordion({ userClients }) {
  const [modalShow, setModalShow] = useState(false);
  const [clientIdIs, setClientIdIs] = useState(0);
  const [clientInit, setClientInit] = useState("");

  const openConfirmDelete = (clientId) => {
    setModalShow(true);
    setClientIdIs(clientId);
  };

  //FIX DELETE CLIENT REFRESH CLIENT MANAGER TO REMOVE DELETED CLIENT

  return (
    <div>
      <DeleteClientModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        client={clientIdIs}
        clientname={clientInit}
      />
      <Accordion className="genInputs">
        {userClients?.map((client) => {
          return (
            <Accordion.Item eventKey={client?.id} key={client?.id}>
              <Accordion.Header>
                <div className="accHeader">
                  Client Data: {client?.client_initials}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="hourlynPayDiv">
                  <p style={{ fontWeight: "bolder" }}>
                    Hourly Rate:{" "}
                    <Badge bg="success" style={{ fontSize: "18px" }}>
                      ${client?.hourly_rate}
                    </Badge>
                  </p>
                </div>
                <p>Guardian(s): {client?.guardianName}</p>
                <p>Guardian Phone: {client?.guardianPhone}</p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      openConfirmDelete(client?.id);
                      setClientInit(client?.client_initials);
                    }}
                  >
                    Delete Client
                  </Button>
                  <Button variant="warning">Update Client</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}

export default ManageClientsAccordion;
