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
          <Card.Title style={{ paddingBottom: 20, fontSize: 20 }}>
            {" "}
            JavaScript{" "}
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default BoardList;
