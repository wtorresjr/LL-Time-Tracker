import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const AddNewClient = () => {
  return (
    <div>
      <h1>Add New Client Page</h1>
      <form action="/">
        <InputGroup size="lg">
          <InputGroup.Text id="inputGroup-sizing-lg">
            Guardian Name
          </InputGroup.Text>
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
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
            placeholder="example: AB <= all capital letters 3 characters max"
            required
          />
        </InputGroup>
        <InputGroup className="mb-3" size="lg">
          <InputGroup.Text>Hourly Rate</InputGroup.Text>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            aria-label="Dollar amount (with dot and two decimal places)"
            pattern="^[0-9]{2,4}\.[0-9]{2}$"
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
    </div>
  );
};

export default AddNewClient;
