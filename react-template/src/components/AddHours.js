import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import Button from "react-bootstrap/Button";

const AddHours = () => {
  return (
    <div>
      <h1>Add Hours</h1>
      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">DATE</InputGroup.Text>
        <Form.Control aria-label="Large" aria-describedby="inputGroup-sizing-sm" type="DATE" />
      </InputGroup>
    </div>
  );
};

export default AddHours;
