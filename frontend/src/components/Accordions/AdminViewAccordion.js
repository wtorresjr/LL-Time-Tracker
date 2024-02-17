import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
// import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
// import PaidHoursModal from "../OpenModalButton/PaidHoursModal";
// import { useEffect, useState } from "react";

import "../../styles/app.css";

function AdminViewAccordion({ employeeHours }) {
  console.log(employeeHours, "<----------Employeed Hours");
  return (
    <div>
      <Accordion className="genInputs" alwaysOpen>
        {employeeHours?.map((employee) => {
          return (
            <Accordion.Item key={employee?.id}>
              <Accordion.Header>
                <div className="accHeader">
                  <div>
                    {employee?.firstName} {employee?.lastName} - Hours
                  </div>
                  <div>
                    Total Owed Employee:{" "}
                    <Badge bg="success" style={{ fontSize: "16px" }}>
                      ${employee?.Total_Employee_Pay}
                    </Badge>
                  </div>
                </div>
              </Accordion.Header>

              {employee?.clients &&
                employee?.clients?.map((client) => {
                  return (
                    <Accordion.Body key={client?.client_initials}>
                      <Accordion.Header>
                        <div className="accHeader">
                          <div>{client.client_initials} - Hours</div>
                          <div>
                            Total Owed Employee:{" "}
                            <Badge bg="success" style={{ fontSize: "16px" }}>
                              ${employee?.Total_Employee_Pay}
                            </Badge>
                          </div>
                        </div>
                      </Accordion.Header>
                      <div className="hourlynPayDiv"></div>
                      <Table bordered>
                        <thead>
                          <tr style={{ display: "flex", width: "100%" }}>
                            <th style={{ width: "25%" }}>Date:</th>
                            <th style={{ width: "25%" }}>Hours:</th>
                            <th style={{ width: "25%", textAlign: "center" }}>
                              Amount Earned:
                            </th>
                            <th style={{ width: "25%", textAlign: "center" }}>
                              Click if paid:
                            </th>
                          </tr>
                        </thead>
                      </Table>
                    </Accordion.Body>
                  );
                })}
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}

export default AdminViewAccordion;
