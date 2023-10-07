import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import "../../styles/app.css";

function ViewHoursAccordion({ userHrs }) {
  return (
    <div>
      <Accordion className="genInputs">
        {userHrs?.map((hours) => {
          return (
            <Accordion.Item eventKey={hours?.id} key={hours?.id}>
              <Accordion.Header>
                <div className="accHeader">
                  Hours For: {hours?.client_initials}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="hourlynPayDiv">
                  <p>Hourly Rate: ${hours?.hourly_rate}</p>
                  <p>Total Pay: ${hours?.Total_Pay}</p>
                </div>
                {hours?.hoursworkeds?.map((day) => {
                  return (
                    <Table bordered key={day?.day_worked}>
                      <tbody>
                        <tr className="hrsDisplayRow">
                          <td>{day?.day_worked}</td>
                          <td>{day?.total_hours}</td>
                          <td>
                            $
                            {(hours?.hourly_rate * day?.total_hours).toFixed(2)}
                          </td>
                          <td>
                            <Button variant="success" style={{ width: "100%" }}>
                              Paid?
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}

export default ViewHoursAccordion;
