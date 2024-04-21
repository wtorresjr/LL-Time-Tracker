import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import PaidHoursModal from "../OpenModalButton/PaidHoursModal";
import { useState } from "react";

import "../../styles/app.css";

function AdminViewAccordion({ employeeHours }) {
  const [modalShow, setModalShow] = useState(false);
  const [dayId, setDayId] = useState(0);
  const [delDate, setDelDate] = useState(0);
  const [clientInit, setClientInit] = useState(0);
  const [totHours, setTotHours] = useState(0);

  const openConfirmDelete = (dayId, delDate, clientInit, totHours) => {
    setModalShow(true);
    setDelDate(delDate);
    setClientInit(clientInit);
    setDayId(dayId);
    setTotHours(totHours);
  };

  return employeeHours?.map((employee) => {
    return (
      <div>
        <PaidHoursModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          dayid={dayId}
          clientinfo={clientInit}
          deldate={delDate}
          tothrs={totHours}
        />
        <Accordion
          className="genInputs"
          key={employee?.firstName + "-" + employee?.lastName}
        >
          <Accordion.Header>
            <div className="accHeader">
              {employee?.firstName} {employee?.lastName} - Hours
              <div>
                Total Owed Employee:{" "}
                <Badge bg="success" style={{ fontSize: "16px" }}>
                  ${employee?.Total_Employee_Pay}{" "}
                </Badge>{" "}
              </div>
            </div>
          </Accordion.Header>
          {employee?.clients &&
            employee?.clients?.map((client) => {
              return (
                <Accordion.Body
                  key={client?.client_initials + "-" + client?.Client_Owes}
                >
                  <Accordion>
                    <Accordion.Header className="accHeader2">
                      <div className="accHeaderInner">
                        <div className="leftHalfHeader">
                          <Badge bg="danger">
                            Client: {client.client_initials}
                          </Badge>
                          Client Hourly Rate:
                          <Badge bg="success" style={{ fontSize: "16px" }}>
                            ${client?.hourly_rate}
                          </Badge>
                        </div>
                        <div className="rightHalfHeader">
                          Billed Hours:
                          <Badge bg="warning" style={{ fontSize: "16px" }}>
                            {client?.Hours_For_Client}
                          </Badge>
                          Bill To Client:
                          <Badge bg="success" style={{ fontSize: "16px" }}>
                            ${client?.Client_Owes}
                          </Badge>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
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

                        {client?.hoursworkeds?.map((day) => {
                          return (
                            <Accordion.Item
                              key={day?.id + "-" + day.day_worked}
                            >
                              <tr className="hrsDisplayRow">
                                <td>{day?.day_worked}</td>
                                <td>{day?.total_hours}</td>
                                <td>
                                  $
                                  {(
                                    client?.hourly_rate * day?.total_hours
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  <Button
                                    variant="danger"
                                    style={{ width: "100%" }}
                                    onClick={(e) =>
                                      openConfirmDelete(
                                        +day?.id,
                                        day?.day_worked,
                                        client?.client_initials,
                                        day?.total_hours
                                      )
                                    }
                                  >
                                    Paid?
                                  </Button>
                                </td>
                              </tr>
                            </Accordion.Item>
                          );
                        })}
                      </Table>
                    </Accordion.Body>
                  </Accordion>
                </Accordion.Body>
              );
            })}
        </Accordion>
      </div>
    );
  });
}

export default AdminViewAccordion;
