import React, { Component } from "react";
import { connect } from "react-redux";
import {
  listAdded,
  getListsByBoard,
  listSelected,
  listUnselected,
} from "../store/lists";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Lists extends Component {
  state = {
    showInput: false,
    showInputTask: false,
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

    this.props.listAdded(newList);
  };

  handleListClick = (id) => {
    this.setState({ showInputTask: true });
    if (this.props.selectedList !== id) this.props.listSelected(id);
  };

  render() {
    const { showInput, showInputTask } = this.state;
    return (
      <React.Fragment>
        {this.props.lists.map((list) => (
          <Card
            style={{ width: "18rem", paddingBottom: 16, marginBottom: 16 }}
            key={list.id}
          >
            <Card.Body>
              <Card.Title>{list.name}</Card.Title>
            </Card.Body>
            <Card style={{ width: "14rem", margin: "auto" }}>
              <Card.Body>
                {this.props.selectedList !== list.id && (
                  <Card.Text onClick={() => this.handleListClick(list.id)}>
                    Añade otra tarea
                  </Card.Text>
                )}
                {this.props.selectedList === list.id && !showInputTask && (
                  <Card.Text onClick={() => this.handleListClick(list.id)}>
                    Añade otra tarea
                  </Card.Text>
                )}
                {this.props.selectedList === list.id && showInputTask && (
                  <form>
                    <Card.Text>
                      <input
                        type="text"
                        placeholder="Introduce el nombre de la lista..."
                        name="name"
                        autoFocus
                      />
                    </Card.Text>
                    <Button variant="primary" type="submit">
                      Añadir tarea
                    </Button>
                  </form>
                )}
              </Card.Body>
            </Card>
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
      selectedList: state.lists.selectedId,
    };
};

const mapDispatchToProps = (dispatch) => ({
  listAdded: (newList) => dispatch(listAdded(newList)),
  listSelected: (id) => dispatch(listSelected(id)),
  listUnselected: (lists) => dispatch(listUnselected(lists)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
