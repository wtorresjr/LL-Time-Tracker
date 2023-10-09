import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import "../../styles/app.css";

function ManageClientsAccordion({ userClients }) {
  return (
    <div>
      <Accordion className="genInputs">
        {userClients?.map((client) => {
          return (
            <Accordion.Item eventKey={client?.id} key={client?.id}>
              <Accordion.Header>
                <div className="accHeader">
                  client For: {client?.client_initials}
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
                  <Button variant="danger">Delete Client</Button>
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
