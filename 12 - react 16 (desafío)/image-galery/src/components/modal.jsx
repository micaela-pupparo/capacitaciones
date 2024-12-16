import { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class ImageModal extends Component {
  render() {
    const { onHide, show, image } = this.props;
    console.log(image);
    return (
      <>
        <Modal show={show} onHide={() => onHide()} centered>
          <Modal.Header closeButton>
            <Modal.Title>Descripción de la imagen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={image.urls.thumb} alt={image.alt_description} />
            <p>
              Usuario: <span>{image.user.name}</span>
            </p>
          </Modal.Body>
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
