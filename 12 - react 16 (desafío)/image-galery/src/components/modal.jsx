/* eslint-disable react/prop-types */
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class ImageModal extends Component {
  state = {
    isImageLoaded: false,
  };

  handleImageLoad = () => {
    this.setState({ isImageLoaded: true });
  };

  handleClose = () => {
    const { onHide } = this.props;

    this.setState({ isImageLoaded: false });
    onHide();
  };

  render() {
    const { show, image } = this.props;
    const { isImageLoaded } = this.state;

    return (
      <>
        <Modal show={show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Image description</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              onLoad={this.handleImageLoad}
              style={{ display: isImageLoaded ? "block" : "none" }}
            />
            {!isImageLoaded && (
              <div id="contenedor">
                <div className="contenedor-loader">
                  <div className="rueda"></div>
                </div>
              </div>
            )}

            <div
              className="container"
              style={{
                marginTop: 10,
                borderTop: "0.5px solid rgb(222, 226, 230)",
                paddingTop: 10,
              }}
            >
              <p>
                <b>Username:</b> <span>@{image.user.username}</span>
              </p>
              <p>
                <b>Description:</b> <span>{image.alt_description}</span>
              </p>
              <p>
                <b>Likes:</b> <span>{image.likes}</span>
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ImageModal;
