import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteFromClients, fetchClientList } from "../../store/clientReducer";
import { useDispatch } from "react-redux";

const DeleteClientModal = (props) => {
  const dispatch = useDispatch();

  const deleteClient = async () => {
    try {
      dispatch(deleteFromClients(props.client));

      await props.onHide(true);
      dispatch(fetchClientList());
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
          Confirm Delete Client
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure?</h4>
        <p>If you'd like to delete {props.clientname}</p>
      </Modal.Body>
      <Modal.Footer
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button onClick={deleteClient} variant="danger">
          Yes, Delete
        </Button>
        <Button onClick={props.onHide} variant="success">
          No, Keep
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteClientModal;
