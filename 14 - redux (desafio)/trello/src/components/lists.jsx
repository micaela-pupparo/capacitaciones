import React, { Component } from "react";
import { connect } from "react-redux";
import List from "./list";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { listAdded, getListIdByBoardId, listUnselected } from "../store/lists";

class Lists extends Component {
  state = {
    showInput: false,
  };

  wrapperRef = React.createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleInputClose);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleInputClose);
    this.props.listUnselected();
  }

  handleAddClick = (e) => {
    e.stopPropagation();
    this.setState({ showInput: true });
  };

  handleInputClose = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ showInput: false });
    }
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

  render() {
    const { showInput } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "baseline",
        }}
      >
        {this.props.lists.map((id) => (
          <List id={id} key={id}></List>
        ))}
        <Card
          style={{ width: "18rem", height: "fit-content", minHeight: 75 }}
          className="m-2"
          ref={this.wrapperRef}
        >
          <Card.Body style={{ padding: 8 }}>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const boardId = state.boards.selectedId;

  if (boardId)
    return {
      lists: getListIdByBoardId(boardId)(state),
      boardId,
    };
};

const mapDispatchToProps = (dispatch) => ({
  listAdded: (newList) => dispatch(listAdded(newList)),
  listUnselected: (lists) => dispatch(listUnselected(lists)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
