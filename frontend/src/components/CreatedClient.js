import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

const CreatedClient = ({ submittedData, infoType }) => {
  return (
    <>
      {infoType === "addClient" && (
        <div>
          <h3>Last Client Created</h3>
          <p>Guardian Name: {submittedData?.guardianName}</p>
          <p>Phone: {submittedData?.guardianPhone}</p>
          <p>Client Initials: {submittedData?.initials}</p>
          <p>Hourly Rate: $ {submittedData?.hourlyRate}</p>
        </div>
      )}

      {infoType === "addHours" && (
        <Alert variant="success">
          <h3 style={{ color: "green", textAlign: "center" }}>
            Successfully Added Hours.
          </h3>
        </Alert>
      )}
    </>
  );
};

export default CreatedClient;
