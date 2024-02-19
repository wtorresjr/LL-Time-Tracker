import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
// import PaidHoursModal from "../OpenModalButton/PaidHoursModal";
// import { useEffect, useState } from "react";

import "../../styles/app.css";

function AdminViewAccordion({ employeeHours }) {
  console.log(employeeHours, "<----------Employeed Hours");

  return employeeHours?.map((employee) => {
    return (
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
                  <Accordion.Header>
                    <div className="accHeaderInner">
                      <div>
                        <div>Client: {client.client_initials}</div>
                        Client Hourly Rate:
                        <Badge bg="success" style={{ fontSize: "16px" }}>
                          ${client?.hourly_rate}
                        </Badge>
                      </div>
                      <div>
                        <br></br>
                        Total Billable Hours:
                        <Badge bg="warning" style={{ fontSize: "16px" }}>
                          {client?.Hours_For_Client}
                        </Badge>
                        <div className="accHeaderRight">
                          Bill To Client:
                          <Badge bg="success" style={{ fontSize: "16px" }}>
                            ${client?.Client_Owes}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Accordion.Header>
                </Accordion>
              </Accordion.Body>
            );
          })}
      </Accordion>
    );
  });
}

export default AdminViewAccordion;

// return (
//   <Accordion className="genInputs">
//     {employeeHours?.map((employee) => {
//       return (
//         <Accordion.Item>
//           <Accordion.Header>
//             <div className="accHeader">
//               <div>
//                 {employee?.firstName} {employee?.lastName} - Hours
//               </div>
//               <div>
//                 Total Owed Employee:{" "}
//                 <Badge bg="success" style={{ fontSize: "16px" }}>
//                   ${employee?.Total_Employee_Pay}
//                 </Badge>
//               </div>
//             </div>
//           </Accordion.Header>

//           {employee?.clients &&
//             employee?.clients?.map((client) => {
//               return (
//                 <Accordion.Body
//                   key={client?.client_initials + "-" + client?.Client_Owes}
//                 >
//                   <Accordion.Header>
//                     <div className="accHeaderInner">
//                       <div>
//                         <div>Client: {client.client_initials}</div>
//                         Client Hourly Rate:{" "}
//                         <Badge bg="success" style={{ fontSize: "16px" }}>
//                           ${client?.hourly_rate}
//                         </Badge>
//                       </div>
//                       <div>
//                         <br></br>
//                         Total Billable Hours:{" "}
//                         <Badge bg="warning" style={{ fontSize: "16px" }}>
//                           {client?.Hours_For_Client}
//                         </Badge>
//                         <div className="accHeaderRight">
//                           Bill To Client:{" "}
//                           <Badge bg="success" style={{ fontSize: "16px" }}>
//                             ${client?.Client_Owes}
//                           </Badge>
//                         </div>
//                       </div>
//                     </div>
//                   </Accordion.Header>

//                   <div className="hourlynPayDiv"></div>
//                   <Table bordered>
//                     <thead>
//                       <tr style={{ display: "flex", width: "100%" }}>
//                         <th style={{ width: "25%" }}>Date:</th>
//                         <th style={{ width: "25%" }}>Hours:</th>
//                         <th style={{ width: "25%", textAlign: "center" }}>
//                           Amount Earned:
//                         </th>
//                         <th style={{ width: "25%", textAlign: "center" }}>
//                           Click if paid:
//                         </th>
//                       </tr>
//                     </thead>
//                     {client?.hoursworkeds?.map((day) => {
//                       return (
//                         <Accordion.Item key={day?.id + "-" + day.day_worked}>
//                           <tr className="hrsDisplayRow">
//                             <td>{day?.day_worked}</td>
//                             <td>{day?.total_hours}</td>
//                             <td>
//                               $
//                               {(
//                                 client?.hourly_rate * day?.total_hours
//                               ).toFixed(2)}
//                             </td>
//                             <td>
//                               <Button
//                                 variant="danger"
//                                 style={{ width: "100%" }}
//                                 // onClick={(e) =>
//                                 //   openConfirmDelete(
//                                 //     +day?.id,
//                                 //     day?.day_worked,
//                                 //     hours?.client_initials,
//                                 //     day?.total_hours
//                                 //   )
//                                 // }
//                               >
//                                 Paid?
//                               </Button>
//                             </td>
//                           </tr>
//                         </Accordion.Item>
//                       );
//                     })}
//                   </Table>
//                 </Accordion.Body>
//               );
//             })}
//         </Accordion.Item>
//       );
//     })}
//   </Accordion>
// );
