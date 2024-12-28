import React, { Component } from "react";
import { connect } from "react-redux";
import { getListsByBoardId } from "../store/boards";
import Card from "react-bootstrap/Card";

class Lists extends Component {
  render() {
    console.log(this.props.lists);
    return (
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
    );
  }
}

const mapStateToProps = (state) => ({
  lists: getListsByBoardId(state),
});

export default connect(mapStateToProps)(Lists);
