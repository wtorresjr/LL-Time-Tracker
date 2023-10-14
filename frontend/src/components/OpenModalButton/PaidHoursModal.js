import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { fetchClientList } from "../../store/clientReducer";
import { deletePaidHours } from "../../store/hoursReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchHours } from "../../store/hoursReducer";

const PaidHoursModal = (props) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.sesssion?.user?.id);

  const deleteHours = async () => {
    try {
      dispatch(deletePaidHours(props?.dayid));

      await props.onHide(true);
      dispatch(fetchClientList(sessionUser));
      dispatch(fetchHours(sessionUser));
    } catch (err) {
      throw err;
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Hours Paid
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Clicking 'Yes' will remove {props?.tothrs} hours for</h4>
        <p>
          <strong>{props?.clientinfo}</strong> on{" "}
          <strong>{props?.deldate}.</strong>
        </p>
      </Modal.Body>
      <Modal.Footer
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button onClick={deleteHours} variant="danger">
          Yes Paid, Remove Hours
        </Button>
        <Button onClick={props.onHide} variant="success">
          Not Paid, Keep Hours
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaidHoursModal;
