import { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class ImageModal extends Component {
  render() {
    const { onHide, show } = this.props;
    return (
      <>
        <Modal show={show} onHide={() => onHide()}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => onHide()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ImageModal;
