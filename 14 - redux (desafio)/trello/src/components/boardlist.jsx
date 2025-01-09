/* eslint-disable react/prop-types */
import { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { SlTrash } from "react-icons/sl";
import { FaTrello } from "react-icons/fa6";
import { MdExpandMore } from "react-icons/md";
import { HiOutlineViewGrid } from "react-icons/hi";
import { CgHeart } from "react-icons/cg";
import { DiAptana } from "react-icons/di";
import { GoPeople } from "react-icons/go";
import { TfiPulse } from "react-icons/tfi";
import { getUserId } from "../store/users";
import {
  boardAdded,
  boardSelected,
  boardUnselected,
  boardDeleted,
  getBoardsByUser,
} from "../store/boards";
import "./boardlist.css";

class BoardList extends Component {
  state = {
    query: "",
    toggle: "none",
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

  // TODO: crear componente reutilizable para el toggle
  handleTogle = () => {
    this.state.toggle === "none"
      ? this.setState({ toggle: "block" })
      : this.setState({ toggle: "none" });
  };

  render() {
    console.log(this.props.boards);
    return (
      <div className="board-page__container">
        <aside className="board-page__aside">
          <section style={{ borderBottom: "2px solid #091e4224" }}>
            <div className="aside__link aside__link--selected">
              <FaTrello />
              <p>Tableros</p>
            </div>
            <div className="aside__link">
              <FaTrello />
              <p>Plantillas</p>
            </div>
            <div className="aside__link">
              <TfiPulse />
              <p>Inicio</p>
            </div>
          </section>
          <section style={{ padding: "12px 0 40px" }}>
            <p style={{ fontSize: 12, padding: "8px 0 8px 12px" }}>
              Espacios de trabajo
            </p>
            <div className="aside__link" onClick={this.handleTogle}>
              <div className="aside__link__logo">E</div>
              <p>Espacio de trabajo de Trello</p>
              <MdExpandMore style={{ minWidth: 16 }} />
            </div>
            <div
              className="aside__link__info"
              style={{ display: this.state.toggle }}
            >
              <div className="aside__link" style={{ paddingLeft: 40 }}>
                <FaTrello />
                <p style={{ fontWeight: "400" }}>Tableros</p>
              </div>
              <div className="aside__link" style={{ paddingLeft: 40 }}>
                <CgHeart />
                <p style={{ fontWeight: "400" }}>Lo más destacado</p>
              </div>
              <div className="aside__link" style={{ paddingLeft: 40 }}>
                <HiOutlineViewGrid />
                <p style={{ fontWeight: "400" }}>Vistas</p>
              </div>
              <div className="aside__link" style={{ paddingLeft: 40 }}>
                <GoPeople />
                <p style={{ fontWeight: "400" }}>Miembros</p>
              </div>
              <div className="aside__link" style={{ paddingLeft: 40 }}>
                <DiAptana />
                <p style={{ fontWeight: "400" }}>Configuración</p>
              </div>
            </div>
          </section>
        </aside>
        <main className="board-page__main">
          <section className="boards__container">
            {this.props.boards &&
              this.props.boards.map((board) => (
                <article
                  className="board__container"
                  style={{ backgroundImage: "url(/flower.svg)" }}
                  key={board.id}
                >
                  <Link
                    className="board__link"
                    key={board.id}
                    to="/lists"
                    onClick={() => this.handleBoardClick(board.id)}
                  >
                    <h3 className="board__title">{board.name}</h3>
                  </Link>
                </article>
              ))}
            <article className="board__container">
              <a className="newboard__link">
                <p className="newboard__title">Crear un tablero nuevo</p>
              </a>
            </article>
          </section>
        </main>

        {/* <div style={{ display: "flex", flexWrap: "wrap" }}>
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
          <Dropdown style={{ width: "18rem" }}>
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
          </Dropdown> */}
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let user = getUserId(state);
  console.log("Current user:", user);
  console.log("Current state:", state);

  if (!user) return { user, boards: null };

  const boards = getBoardsByUser(user.id)(state);
  console.log("Filtered boards:", boards);

  return {
    user,
    boards,
  };
};

const mapDispatchToProps = (dispatch) => ({
  boardAdded: (board) => dispatch(boardAdded(board)),
  boardDeleted: (id) => dispatch(boardDeleted(id)),
  boardSelected: (boardId) => dispatch(boardSelected(boardId)),
  boardUnselected: () => dispatch(boardUnselected()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardList);
