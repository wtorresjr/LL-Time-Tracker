const CreatedClient = ({ submittedData }) => {
  return (
    <div>
      <h3>Last Client Created</h3>
      <p>Guardian Name: {submittedData?.guardianName}</p>
      <p>Phone: {submittedData?.guardianPhone}</p>
      <p>Client Initials: {submittedData?.initials}</p>
      <p>Hourly Rate: {submittedData?.hourlyRate}</p>
    </div>
  );
};

export default CreatedClient;
