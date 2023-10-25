// import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
// import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
// import PaidHoursModal from "../OpenModalButton/PaidHoursModal";
// import { useEffect, useState } from "react";

import "../../styles/app.css";

function AdminViewAccordion({ employeeHours }) {
  //   const [modalShow, setModalShow] = useState(false);
  //   const [dayId, setDayId] = useState(0);
  //   const [delDate, setDelDate] = useState(0);
  //   const [clientInit, setClientInit] = useState(0);
  //   const [totHours, setTotHours] = useState(0);
  //   const [emailHours, setEmailHours] = useState();

  //   const openConfirmDelete = (dayId, delDate, clientInit, totHours) => {
  //     setModalShow(true);
  //     setDelDate(delDate);
  //     setClientInit(clientInit);
  //     setDayId(dayId);
  //     setTotHours(totHours);
  //   };

  //   const handleEmail = () => {
  //     if (emailHours) {
  //       let hoursToEmail = emailHours.hours;
  //       let hoursWorked = hoursToEmail.hoursworkeds;
  //       const subject = `Hours for ${hoursToEmail.client_initials}`;

  //       const body = `
  //       Hi, Here are the hours for ${hoursToEmail.client_initials}:

  //       Client: ${hoursToEmail.client_initials}
  //       Hourly Rate: $${hoursToEmail.hourly_rate}
  //       Total Hours: ${hoursToEmail.TotalClientHours} hours
  //       Total Client Pay: $${hoursToEmail.Total_Pay}

  //       Hours Worked:
  //       ${hoursWorked.map((hours) => {
  //         return `\n      Day Worked: ${hours.day_worked} == Hours Worked: ${
  //           hours.total_hours
  //         }\n      Pay For Day: $${(
  //           hours.total_hours * hoursToEmail.hourly_rate
  //         ).toFixed(2)}\n`;
  //       })}
  //       Total Client Pay: $${hoursToEmail.Total_Pay}
  //             `;

  //       const mailtoLink = `mailto:?subject=${encodeURIComponent(
  //         subject
  //       )}&body=${encodeURIComponent(body)}`;

  //       window.location.href = mailtoLink;
  //     }
  //   };

  //   useEffect(() => {
  //     handleEmail();
  //   }, [emailHours]);

  return (
    <div>
      {/* <PaidHoursModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        dayid={dayId}
        clientinfo={clientInit}
        deldate={delDate}
        tothrs={totHours}
      /> */}
      <Accordion className="genInputs" alwaysOpen>
        {employeeHours?.map((employee) => {
          return (
            <Accordion.Item key={employee?.id}>
              <Accordion.Header>
                <div className="accHeader">
                  {employee?.firstName} {employee?.lastName} - Hours
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="hourlynPayDiv">
                  {/* <p style={{ fontWeight: "bolder" }}>
                    Hourly Rate:{" "}
                    <Badge bg="success" style={{ fontSize: "18px" }}>
                      ${hours?.hourly_rate}
                    </Badge>
                  </p> */}
                  {/* <p style={{ fontWeight: "bolder" }}>
                    Total Pay:{" "}
                    <Badge bg="success" style={{ fontSize: "18px" }}>
                      ${hours?.Total_Pay}
                    </Badge>
                  </p> */}
                </div>
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

                {/* <div
                  style={{
                    margin: "25px 0 0 0",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="warning"
                    onClick={() => {
                      setEmailHours({ hours });
                    }}
                  >
                    Email Hours for {hours?.client_initials}
                    <i
                      className="fa-regular fa-envelope fa-xl"
                      style={{
                        backgroundColor: "transparent",
                        padding: "0 0 0 10px",
                      }}
                    ></i>
                  </Button>{" "}
                </div> */}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}

export default AdminViewAccordion;
