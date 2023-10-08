import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewClient, fetchClientList } from "../store/clientReducer";
import CreatedClient from "./CreatedClient";
import "../styles/app.css";

const AddNewClient = () => {
  const dispatch = useDispatch();
  const userClients = useSelector(
    (state) => state?.clientList?.clients?.clients
  );
  const [guardianName, setGuardianName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [clientInitials, setClientInitials] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [theErrors, setErrors] = useState({});
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [submittedData, setSubmittedData] = useState(null);

  const errors = {};

  useEffect(() => {
    dispatch(fetchClientList());
  }, [dispatch]);

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
      guardianName: guardianName.toUpperCase(),
      guardianPhone: telephone,
      initials: clientInitials.toUpperCase(),
      hourlyRate: hourlyRate,
    };

    dispatch(addNewClient(newClientObj)).then(() => {
      setSubmittedData(newClientObj);
    });

    setGuardianName("");
    setTelephone("");
    setClientInitials("");
    setHourlyRate("");
  };

  return (
    <div className="generalContainer">
      <div className="titleHeaders">
        <h1>Add New Client</h1>
      </div>
      <form onSubmit={onSubmit}>
        {submittedData && (
          <CreatedClient submittedData={submittedData} infoType={"addClient"} />
        )}
        <InputGroup size="lg" className="genInputs">
          <InputGroup.Text id="inputGroup-sizing-lg">
            Guardian Name
          </InputGroup.Text>
          <Form.Control
          style={{backgroundColor:'#d5ebff'}}
            pattern="[a-zA-Z ]{2,35}"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            value={guardianName}
            onChange={(e) => setGuardianName(e.target.value)}
            required
          />
        </InputGroup>
        {theErrors.guardianName && (
          <p className="warningPtag">{theErrors.guardianName}</p>
        )}
        <InputGroup size="lg" className="genInputs">
          <InputGroup.Text id="inputGroup-sizing-lg">Phone</InputGroup.Text>
          <Form.Control
            style={{backgroundColor:'#d5ebff'}}
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
        {theErrors.telephone && (
          <p className="warningPtag">{theErrors.telephone}</p>
        )}
        <InputGroup size="lg" className="genInputs">
          <InputGroup.Text id="inputGroup-sizing-lg">
            Client Initials
          </InputGroup.Text>
          <Form.Control
            style={{backgroundColor:'#d5ebff'}}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            // pattern="[A-Z]{2,3}"
            value={clientInitials}
            onChange={(e) => setClientInitials(e.target.value)}
            placeholder="All capital letters 3 character max"
            required
          />
        </InputGroup>
        {theErrors.clientInitials && (
          <p className="warningPtag">{theErrors.clientInitials}</p>
        )}
        <InputGroup className="genInputs" size="lg">
          <InputGroup.Text>Hourly Rate</InputGroup.Text>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            style={{backgroundColor:'#d5ebff'}}
            aria-label="Dollar amount (with dot and two decimal places)"
            pattern="^[0-9]{2,4}\.[0-9]{2}$"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            placeholder="example: 20.00"
            required
          />
        </InputGroup>
        {theErrors.hourlyRate && (
          <p className="warningPtag">{theErrors.hourlyRate}</p>
        )}
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
    </div>
  );
};

export default AddNewClient;
