import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const AddNewClient = () => {
  const [guardianName, setGuardianName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [clientInitials, setClientInitials] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

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
          pattern="[a-Z]{2}"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          value={guardianName}
          onChange={(e) => setGuardianName(e.target.value)}
          required
        />
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
          placeholder="All capital letters 3 characters max"
          required
        />
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
      </InputGroup>
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddNewClient;
