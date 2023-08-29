import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const AddHours = () => {
  const [clientInitials, setClientInitials] = useState("");
  const [workDate, setWorkDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalHours, setTotalHours] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const clientHoursWorked = {
      clientInitials,
      workDate,
      startTime,
      endTime,
      totalHours,
    };

    console.log(clientHoursWorked);

    setClientInitials("");
    setWorkDate("");
    setStartTime("");
    setEndTime("");
    setTotalHours("");
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Add Hours</h1>

      <InputGroup size="lg">
        //Client dropdown will be populated by mapping through user clients when
        logged in
        <Form.Select
          size="lg"
          onChange={(e) => setClientInitials(e.target.value)}
          value={clientInitials}
        >
          <option value="">Choose Client</option>
          <option value="EE">EE</option>
          <option value="MG">MG</option>
        </Form.Select>
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">DATE</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          type="DATE"
          onChange={(e) => setWorkDate(e.target.value)}
          value={workDate}
        />
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Start Time</InputGroup.Text>

        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          type="TIME"
          onChange={(e) => setStartTime(e.target.value)}
          value={startTime}
        />
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">End Time</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          type="TIME"
          onChange={(e) => setEndTime(e.target.value)}
          value={endTime}
        />
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Total Hours</InputGroup.Text>
        <Form.Control
          aria-label="large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => setTotalHours(e.target.value)}
          value={totalHours}
        />
      </InputGroup>

      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" type="submit">
          Submit Hours
        </Button>
      </div>
    </form>
  );
};

export default AddHours;
