import { useModal } from "../../context/modal";

const InfoModal = ({ clientData }) => {
  return (
    <>
      <h1>Info Modal</h1>
      {clientData?.guardianName}
    </>
  );
};

export default InfoModal;
