import React, { Component } from "react";
import { connect } from "react-redux";
import { getListsByBoardId } from "../store/boards";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Lists extends Component {
  state = {
    showInput: false,
  };

  componentDidMount() {
    document.addEventListener("click", this.handleInputClose);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleInputClose);
  }

  handleAddClick = (e) => {
    e.stopPropagation();
    this.setState({ showInput: true });
  };

  handleInputClose = () => {
    if (this.state.showInput) this.setState({ showInput: false });
    console.log("clicked");
  };

  render() {
    const { showInput } = this.state;
    console.log(this.props.lists);
    return (
      <React.Fragment>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            {!showInput && (
              <Card.Text onClick={this.handleAddClick}>
                Añade otra lista
              </Card.Text>
            )}
            {showInput && (
              <React.Fragment>
                <Card.Text>
                  <input
                    type="text"
                    placeholder="Introduce el nombre de la lista..."
                  />
                </Card.Text>
                <Button variant="primary">Añadir lista</Button>
              </React.Fragment>
            )}
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  lists: getListsByBoardId(state),
});

export default connect(mapStateToProps)(Lists);
