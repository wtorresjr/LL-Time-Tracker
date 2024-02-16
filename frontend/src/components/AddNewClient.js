import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewClient, fetchClientList } from "../store/clientReducer";
import CreatedClient from "./CreatedClient";
import "../styles/app.css";

const AddNewClient = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);
  const [guardianName, setGuardianName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [clientInitials, setClientInitials] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [theErrors, setErrors] = useState({});
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [submittedData, setSubmittedData] = useState(null);

  const caretPositionRef = useRef(0);
  const errors = {};
  useEffect(() => {
    const regexLettersOnly = /^[A-Z a-z]*$/;
    const regexPhoneNum = /^[0-9-]*$/;

    const validateInput = () => {
      if (!guardianName || guardianName.length < 2)
        errors.guardianName = "Guardian Name is required";
      else if (!regexLettersOnly.test(guardianName)) {
        errors.guardianName =
          "Guardian name cannot include numbers or special characters";
      }

      if (telephone.length < 12) errors.telephone = "Telephone is required";
      if (telephone.length > 12) {
        setTelephone(telephone.slice(0, 12));
      }
      
      if (!regexPhoneNum.test(telephone)) {
        errors.telephone = "Telephone number must only be numbers";
      }
      if (!clientInitials.length)
        errors.clientInitials = "Client initials are required";
      else if (clientInitials.length > 3)
        errors.clientInitials = "Initials must be 2 or 3 characters long";
      else if (!regexLettersOnly.test(clientInitials))
        errors.clientInitials =
          "Client initials cannot include numbers or special characters";

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
    };
    validateInput();
  }, [guardianName, telephone, clientInitials, hourlyRate]);

  useEffect(() => {
    if (telephone.length === 3 || telephone.length === 7) {
      setTelephone((prevTelephone) => {
        caretPositionRef.current += 1;
        return prevTelephone + "-";
      });
    }
  }, [telephone]);

  const checkKey = (e) => {
    if (e.key === "Backspace") {
      setTelephone("");
    }
  };

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
        <h1>Add New Client for {sessionUser?.firstName}</h1>
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
            style={{ backgroundColor: "#d5ebff" }}
            pattern="[a-zA-Z ]{2,35}"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            value={guardianName}
            onChange={(e) => setGuardianName(e.target.value.toUpperCase())}
            required
          />
        </InputGroup>
        {theErrors.guardianName && (
          <p className="warningPtag">{theErrors.guardianName}</p>
        )}
        <InputGroup size="lg" className="genInputs">
          <InputGroup.Text id="inputGroup-sizing-lg">Phone</InputGroup.Text>
          <Form.Control
            style={{ backgroundColor: "#d5ebff" }}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="555-555-5555"
            value={telephone}
            onKeyDown={checkKey}
            onChange={(e) => {
              setTelephone(e.target.value);
              caretPositionRef.current = e.target.selectionStart;
            }}
            ref={(input) => {
              if (input) {
                input.setSelectionRange(
                  caretPositionRef.current,
                  caretPositionRef.current
                );
              }
            }}
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
            style={{ backgroundColor: "#d5ebff" }}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            pattern="[A-Z]{2,3}"
            value={clientInitials}
            onChange={(e) => setClientInitials(e.target.value.toUpperCase())}
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
            style={{ backgroundColor: "#d5ebff" }}
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
