import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

const AddNewClient = () => {
  const [guardianName, setGuardianName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [clientInitials, setClientInitials] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [theErrors, setErrors] = useState({});
  const [disabledBtn, setDisabledBtn] = useState(true);

  const errors = {};

  useEffect(() => {
    if (guardianName.length < 2)
      errors.guardianName = "Guardian Name is required";
    if (telephone.length < 12) errors.telephone = "Telephone is required";
    if (clientInitials.length < 2)
      errors.clientInitials = "Client initials are required";
    if (hourlyRate.length < 4) errors.hourlyRate = "Hourly rate is required";
    setErrors(errors);

    if (
      !errors.guardianName &&
      !errors.telephone &&
      !errors.clientInitials &&
      !errors.hourlyRate
    ) {
      setDisabledBtn(false);
    }
  }, [guardianName, telephone, clientInitials, hourlyRate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newClientObj = {
      guardianName: guardianName,
      guardianPhone: telephone,
      client_initials: clientInitials,
      hourly_rate: hourlyRate,
    };

    console.log(newClientObj);

    setGuardianName("");
    setTelephone("");
    setClientInitials("");
    setHourlyRate("");
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Add New Client Page</h1>
      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">
          Guardian Name
        </InputGroup.Text>
        <Form.Control
          pattern="[A-Za-z]{2,35}"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          value={guardianName}
          onChange={(e) => setGuardianName(e.target.value)}
          required
        />
        {theErrors.guardianName && (
          <p className="warningPtag">{theErrors.guardianName}</p>
        )}
      </InputGroup>
      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Phone</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="555-555-5555"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />
        {theErrors.telephone && (
          <p className="warningPtag">{theErrors.telephone}</p>
        )}
      </InputGroup>
      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">
          Client Initials
        </InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          pattern="[A-Z]{2,3}"
          value={clientInitials}
          onChange={(e) => setClientInitials(e.target.value)}
          placeholder="All capital letters 3 character max"
          required
        />
        {theErrors.clientInitials && (
          <p className="warningPtag">{theErrors.clientInitials}</p>
        )}
      </InputGroup>
      <InputGroup className="mb-3" size="lg">
        <InputGroup.Text>Hourly Rate</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control
          aria-label="Dollar amount (with dot and two decimal places)"
          pattern="^[0-9]{2,4}\.[0-9]{2}$"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          placeholder="example: 20.00"
          required
        />
        {theErrors.hourlyRate && (
          <p className="warningPtag">{theErrors.hourlyRate}</p>
        )}
      </InputGroup>
      <div className="d-grid gap-2">
        <Button
          variant="primary"
          size="lg"
          type="submit"
          disabled={disabledBtn}
        >
          Create New Client
        </Button>
      </div>
    </form>
  );
};

export default AddNewClient;
