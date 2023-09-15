import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

const AddHours = () => {
  const [clientInitials, setClientInitials] = useState("");
  const [workDate, setWorkDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [theErrors, setErrors] = useState({});
  const [disabledBtn, setDisabledBtn] = useState(true);

  const errors = {};

  useEffect(() => {
    if (workDate.length === 0) errors.workDate = "Work date is required";
    if (startTime.length === 0) errors.startTime = "Start time is required";
    if (endTime.length === 0) errors.endTime = "End time is required";
    if (clientInitials.length === 0)
      errors.clientInitials = "Client is required";
    setErrors(errors);

    if (
      !errors.workDate &&
      !errors.startTime &&
      !errors.endTime &&
      !errors.clientInitials
    ) {
      setDisabledBtn(false);
    }
  }, [workDate, startTime, endTime, clientInitials]);

  useEffect(() => {
    let [startHour, startMins] = startTime.split(":");
    let [endHour, endMins] = endTime.split(":");

    let hours = endHour - startHour;
    let mins = (endMins - startMins) / 60;
    hours += mins;

    setTotalHours(Math.abs(hours.toFixed(2)));
  }, [startTime, endTime]);

  const onSubmit = (e) => {
    e.preventDefault();

    const clientHoursWorked = {
      clientInitials: clientInitials,
      workDate: workDate,
      startTime: startTime,
      endTime: endTime,
      totalHours: totalHours,
    };

    console.log(clientHoursWorked);
    setClientInitials("");
    setWorkDate("");
    setStartTime("");
    setEndTime("");
    setTotalHours("");
  };

  //Client dropdown will be populated by mapping through user clients when logged in
  return (
    <form onSubmit={onSubmit}>
      <h1>Add Hours</h1>

      <InputGroup size="lg">
        <Form.Select
          size="lg"
          onChange={(e) => setClientInitials(e.target.value)}
          value={clientInitials}
          required
        >
          <option value="">Choose Client</option>
          <option value="EE">EE</option>
          <option value="MG">MG</option>
        </Form.Select>
        {theErrors.clientInitials && (
          <p className="warningPtag">{theErrors.clientInitials}</p>
        )}
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">DATE</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          type="DATE"
          onChange={(e) => setWorkDate(e.target.value)}
          value={workDate}
          required
        />
        {theErrors.workDate && (
          <p className="warningPtag">{theErrors.workDate}</p>
        )}
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Start Time</InputGroup.Text>

        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          type="TIME"
          onChange={(e) => setStartTime(e.target.value)}
          value={startTime}
          required
        />
        {theErrors.startTime && (
          <p className="warningPtag">{theErrors.startTime}</p>
        )}
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">End Time</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          type="TIME"
          onChange={(e) => setEndTime(e.target.value)}
          value={endTime}
          required
        />
        {theErrors.endTime && (
          <p className="warningPtag">{theErrors.endTime}</p>
        )}
      </InputGroup>

      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Total Hours</InputGroup.Text>
        <Form.Control
          aria-label="large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => setTotalHours(e.target.value)}
          value={totalHours}
          disabled
        />
      </InputGroup>

      <div className="d-grid gap-2">
        <Button
          variant="primary"
          size="lg"
          type="submit"
          disabled={disabledBtn}
        >
          Submit Hours
        </Button>
      </div>
    </form>
  );
};

export default AddHours;
