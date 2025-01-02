/* eslint-disable react/prop-types */
import { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { SlTrash } from "react-icons/sl";
import { getUserId } from "../store/users";
import {
  boardAdded,
  boardSelected,
  boardUnselected,
  boardDeleted,
  getBoardsByUser,
} from "../store/boards";

class BoardList extends Component {
  state = {
    query: "",
  };

  componentDidMount() {
    this.props.boardUnselected();
  }

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

  handleBoardClick = (id) => {
    this.props.boardSelected(id);
  };

  handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.boardDeleted(id);
  };

  render() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {this.props.boards &&
          this.props.boards.map((board) => (
            <Link
              key={board.id}
              to="/lists"
              onClick={() => this.handleBoardClick(board.id)}
              style={{ margin: 8 }}
            >
              <Card
                bg="light"
                text="dark"
                style={{ width: "18rem" }}
                className="mb-2 ml-2 mr-2"
              >
                <Card.Body>
                  <Card.Title
                    style={{
                      paddingBottom: 20,
                      fontSize: 20,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                    id={board.id}
                  >
                    <p>{board.name}</p>
                    <SlTrash
                      style={{ fontSize: 15 }}
                      onClick={(e) => this.handleDelete(e, board.id)}
                    />
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          ))}
        <Dropdown style={{ width: "18rem", margin: 8 }}>
          <Dropdown.Toggle id="dropdown-basic" style={{ width: "100%" }}>
            Crear un tablero nuevo
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ minWidth: "200px", width: "50%" }}>
            <Dropdown.ItemText
              style={{
                fontSize: "1.1rem",
                color: "#44546f",
                textAlign: "center",
              }}
            >
              Crear tablero
            </Dropdown.ItemText>
            <Dropdown.ItemText style={{ margin: "2rem auto" }}>
              <label style={{ display: "block", width: "100%" }}>
                Título del tablero
                <input
                  style={{
                    display: "block",
                    width: "100%",
                    border: "0.5px solid #091e4224",
                    borderRadius: 1,
                  }}
                  type="text"
                  onChange={this.handleChange}
                  autoFocus
                />
              </label>
            </Dropdown.ItemText>
            <Dropdown.Item
              as="button"
              style={{ textAlign: "center" }}
              disabled={!(this.state.query && true)}
              onClick={this.handleSubmit}
            >
              Crear
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let user = getUserId(state);
  if (!user) return { user, boards: null };
  return {
    user,
    boards: getBoardsByUser(user.id)(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  boardAdded: (board) => dispatch(boardAdded(board)),
  boardDeleted: (id) => dispatch(boardDeleted(id)),
  boardSelected: (boardId) => dispatch(boardSelected(boardId)),
  boardUnselected: (boards) => dispatch(boardUnselected(boards)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardList);
