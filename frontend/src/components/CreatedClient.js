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
        <h3 style={{ color: "green" }}>Successfully Submitted Hours.</h3>
      )}
    </>
  );
};

export default CreatedClient;
