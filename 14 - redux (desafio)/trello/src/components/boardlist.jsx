import { Component } from "react";
import Card from "react-bootstrap/Card";

class BoardList extends Component {
  render() {
    return (
      <Card
        bg="light"
        key="light"
        text="dark"
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Body>
          <Card.Title> Card Title </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default BoardList;
