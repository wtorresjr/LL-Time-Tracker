import Button from "react-bootstrap/Button";

const AddHours = () => {
  return (
    <div className="mainDisplay">
      <div className="mainContent">
        <h1>Add Hours Page</h1>
        <h4>Day Worked</h4>
        <input className="hoursInputs" type="Date"></input>
        <h4>Start Time</h4>
        <input className="hoursInputs" type="Time"></input>
        <h4>End Time</h4>
        <input className="hoursInputs" type="Time"></input>
        <Button variant="primary" size="lg" className="wideBtns">
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default AddHours;
