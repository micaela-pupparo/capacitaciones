/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { getUserId } from "../store/users";
import { boardAdded } from "../store/boards";

class BoardList extends Component {
  state = {
    query: "",
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = () => {
    let newBoard = {
      name: this.state.query,
      userId: this.props.user.id,
    };

    this.props.boardAdded(newBoard);

    console.log("Submitted");
  };

  render() {
    return (
      <React.Fragment>
        <DropdownButton id="dropdown-item-button" title="Crear">
          <Dropdown.ItemText>Crear tablero</Dropdown.ItemText>
          <Dropdown.ItemText>
            <label>
              Título del tablero
              <input type="text" onChange={this.handleChange} />
            </label>
          </Dropdown.ItemText>
          <Dropdown.Item
            as="button"
            disabled={!(this.state.query && true)}
            onClick={this.handleSubmit}
          >
            Crear
          </Dropdown.Item>
        </DropdownButton>

        {this.props.boards.map((board) => (
          <Card
            bg="light"
            key={board.id}
            text="dark"
            style={{ width: "18rem" }}
            className="mb-2"
          >
            <Card.Body>
              <Card.Title style={{ paddingBottom: 20, fontSize: 20 }}>
                {board.name}
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  boards: state.boards.list,
  user: getUserId(state.users.logged.username),
});

const mapDispatchToProps = (dispatch) => ({
  boardAdded: (board) => dispatch(boardAdded(board)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardList);
