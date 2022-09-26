import { Button, Modal } from "react-bootstrap";
import { ModalProps } from "../../types";

const ConfirmModal = (props: ModalProps<any>) => {
  return (
    <Modal show={props.visible} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Está seguro de querer borrar este elemento?</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.close}>
          Cancelar
        </Button>
        <Button variant="outline-danger" onClick={props.onDone}>
          Borrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
