import React, { Component } from "react";
import { connect } from "react-redux";
import { listAdded, getListsByBoard } from "../store/lists";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Lists extends Component {
  state = {
    showInput: false,
  };

  // componentDidMount() {
  //   document.addEventListener("click", this.handleInputClose);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("click", this.handleInputClose);
  // }

  handleAddClick = (e) => {
    e.stopPropagation();
    this.setState({ showInput: true });
  };

  handleInputClose = () => {
    // if (this.state.showInput) this.setState({ showInput: false });
    console.log("clicked");
  };

  handleAddList = (e) => {
    e.preventDefault();
    const newList = {
      name: e.target.name.value,
      boardId: this.props.boardId,
    };

    console.log(e);
    console.log(newList);

    this.props.listAdded(newList);
  };

  render() {
    const { showInput } = this.state;
    console.log(this.props);
    return (
      <React.Fragment>
        {this.props.lists.map((list) => (
          <Card style={{ width: "18rem" }} key={list.id}>
            <Card.Body>
              <Card.Title>{list.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            {!showInput && (
              <Card.Text onClick={this.handleAddClick}>
                Añade otra lista
              </Card.Text>
            )}
            {showInput && (
              <form onSubmit={this.handleAddList}>
                <Card.Text>
                  <input
                    type="text"
                    placeholder="Introduce el nombre de la lista..."
                    name="name"
                    autoFocus
                  />
                </Card.Text>
                <Button variant="primary" type="submit">
                  Añadir lista
                </Button>
              </form>
            )}
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const boardId = state.boards.selectedId;

  if (boardId)
    return {
      lists: getListsByBoard(boardId)(state),
      boardId,
    };
};

const mapDispatchToProps = (dispatch) => ({
  listAdded: (newList) => dispatch(listAdded(newList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
