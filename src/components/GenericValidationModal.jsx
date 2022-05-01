import { Button, Modal } from "react-bootstrap";

function GenericValidationModal({ title, body, onClose }) {
  return (
    <Modal show={true}>
      <Modal.Header>
              <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
              <p>{body}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GenericValidationModal;
