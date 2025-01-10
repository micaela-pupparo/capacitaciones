import React, { Component } from "react";
import { connect } from "react-redux";
import List from "./list";
import { VscAdd, VscChromeClose } from "react-icons/vsc";
import { FiStar } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { MdExpandMore } from "react-icons/md";
import { RiRocketLine } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";
import { DiAptana } from "react-icons/di";
import { VscListFilter } from "react-icons/vsc";
import { LiaUser, LiaThListSolid, LiaCalendar } from "react-icons/lia";
import { FaTrello } from "react-icons/fa6";
import { BsFillLightningFill, BsPersonPlus } from "react-icons/bs";
import { LuAlignStartHorizontal } from "react-icons/lu";
import { listAdded, listUnselected } from "../store/lists";
import { navbarClassChanged } from "../store/ui";
import { getOrderListByBoard, getBoardById } from "../store/boards";
import { addListUpdateOrder } from "../store/middlewares/updateOrderList";
import "./lists.css";

class Lists extends Component {
  state = {
    showInput: false,
    listsRefs: [],
    draggedItem: null,
    draggingOver: null,
    listsOrder: this.props.lists,
  };

  wrapperRef = React.createRef();
  itemsRef = new Map();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleInputClose);
    this.props.lists.forEach(() =>
      this.state.listsRefs.push(React.createRef())
    );
    this.props.navbarClassChanged({ class: "navbar--pink" });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleInputClose);
    this.props.listUnselected();
    this.props.navbarClassChanged({ class: "navbar--white" });
  }

  handleAddClick = (e) => {
    e.stopPropagation();
    this.setState({ showInput: true });
  };

  handleInputClose = async (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ showInput: false });
    }
    // console.log("clicked");
  };

  handleAddList = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newList = {
      name: e.target.name.value,
      boardId: this.props.boardId,
    };

    this.props.addListUpdateOrder(newList, this.props.boardId);

    setTimeout(() => this.setState({ listsOrder: this.props.lists }), 100);
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.prevState.listsOrder !== this.props.lists) {
  //     this.setState({ listsOrder: this.props.lists });
  //   }
  // }

  handleDragStart = (e, listId, listIndex) => {
    e.stopPropagation();
    // console.log(e);

    const rect = e.target.getBoundingClientRect();

    this.setState({
      draggedItem: { id: listId, index: listIndex, rect, clientX: e.clientX },
      draggingOver: null,
    });
  };

  handleDragEnter = (e) => {
    e.preventDefault();
  };

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState);
  // }

  handleDragOver = (e, targetId, targetIndex) => {
    // console.log(e);
    e.preventDefault();
    if (this.state.draggedItem && targetId && targetIndex) {
      if (this.state.draggedItem.id === targetId) return;

      this.setState({ draggingOver: { id: targetId, index: targetIndex } });
      const { listsOrder, draggedItem, draggingOver } = this.state;

      const targetElement = e.currentTarget;
      if (!targetElement.contains(e.target)) {
        return;
      }

      const rect = targetElement.getBoundingClientRect();

      const mousePosition = e.clientX;

      const targetLeft = rect.left;
      const targetWidth = rect.width;
      const targetCenter = targetLeft + targetWidth / 2;

      // Izquierda
      if (mousePosition < targetCenter) {
        if (
          !listsOrder[targetIndex + 1] ||
          listsOrder[targetIndex + 1] !== draggedItem.id
        ) {
          this.setState({ draggingOver: null });
          return;
        }

        const listToMoveToIndex = listsOrder.find(
          (id) => id === draggedItem.id
        );
        const listToMoveRight = listsOrder.find((id) => id === targetId);
        const newOrder = listsOrder.filter(
          (id) => id !== targetId && id !== draggedItem.id
        );

        newOrder.splice(targetIndex, 0, listToMoveToIndex);
        newOrder.splice(targetIndex + 1, 0, listToMoveRight);

        this.setState({ listsOrder: newOrder });
      } else {
        if (
          !listsOrder[targetIndex - 1] ||
          listsOrder[targetIndex - 1] !== draggedItem.id
        ) {
          this.setState({ draggingOver: null });
          return;
        }

        const listToMoveToIndex = listsOrder.find(
          (id) => id === draggedItem.id
        );
        const listToMoveLeft = listsOrder.find((id) => id === targetId);
        const newOrder = listsOrder.filter(
          (id) => id !== draggingOver.id && id !== draggedItem.id
        );
        newOrder.splice(targetIndex - 1, 0, listToMoveLeft);
        newOrder.splice(targetIndex, 0, listToMoveToIndex);

        this.setState({ listsOrder: newOrder });
      }

      this.setState({ draggingOver: null });
    }
  };

  handleDrop = (e, index) => {};

  render() {
    const { listsRefs, showInput, draggingOver } = this.state;
    return (
      <div className="lists__container">
        <aside className="nav-lists__container">
          <div className="nav-lists__space-work">
            <div className="nav-lists__space-work__image">E</div>
            <div className="nav-lists__space-work__name">
              Espacio de trabajo de Trello
            </div>
            <MdExpandMore
              style={{
                minWidth: 16,
                color: "#fff",
                transform: "rotate(90deg)",
                width: 24,
                height: 24,
              }}
            />
          </div>
          <div className="nav-lists__links">
            <div className="nav-lists__link">
              <FaTrello />
              <div>Tableros</div>
            </div>
            <div className="nav-lists__link">
              <LiaUser />
              <div>Miembros</div>
            </div>
            <div className="nav-lists__link">
              <DiAptana />
              <div>Ajustes del Espacio de trabajo</div>
            </div>
          </div>
          <div className="nav-lists__links">
            <div className="nav-lists__title">
              Vistas del Espacio de trabajo
            </div>
            <div className="nav-lists__link">
              <LiaThListSolid />
              <div>Tabla</div>
            </div>
            <div className="nav-lists__link">
              <BiCalendar />
              <div>Calendario</div>
            </div>
          </div>
          <div className="nav-lists__links">
            <div className="nav-lists__title">Sus tableros</div>
            <div className="nav-lists__link">
              <LiaThListSolid />
              <div>Tabla</div>
            </div>
            <div className="nav-lists__link">
              <BiCalendar />
              <div>Calendario</div>
            </div>
          </div>
        </aside>
        <main className="main-lists__container">
          <div className="lists__header">
            <div className="lists__header-wrapper">
              <div className="lists__header__items">
                <h3 className="lists__header__title">
                  {this.props.board.name}
                </h3>
                <FiStar className="lists__header__icon" />
                <div className="lists__header__link">
                  <GoPeople />
                  <p>Visible para el Espacio de trabajo</p>
                </div>
                <div className="lists__header__link list__header__button">
                  <LuAlignStartHorizontal />
                  <p>Tablero</p>
                </div>

                <MdExpandMore
                  style={{ minWidth: 16, color: "#fff", fontSize: 20 }}
                />
              </div>
              <div className="lists__header__items">
                <div className="lists__header__link">
                  <RiRocketLine style={{ transform: "rotate(45deg)" }} />
                  <p>Power-ups</p>
                </div>
                <div className="lists__header__link">
                  <BsFillLightningFill />
                  <p>Automatización</p>
                </div>
                <div className="lists__header__link">
                  <VscListFilter />
                  <p>Filtros</p>
                </div>
                <span className="lists__header__space-bar"></span>
                <div className="lists__header__user">
                  <p style={{ fontSize: 12, fontWeight: "600" }}>MP</p>
                </div>
                <div className="lists__header__link list__header__button">
                  <BsPersonPlus />
                  <p>Compartir</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lists">
            {this.state.listsOrder.map((id, index) => (
              <article
                className={
                  draggingOver === id
                    ? "list__container dragged-over"
                    : `list__container`
                }
                key={id}
                draggable
                onDragOver={(e) => this.handleDragOver(e, id, index)}
                onDrop={(e) => this.handleDrop(e, id, index)}
                onDragStart={(e) => this.handleDragStart(e, id, index)}
                onDragEnd={() => this.setState({ draggedItem: null })}
              >
                <List id={id} ref={listsRefs[index]}></List>
              </article>
            ))}

            <article className="list__container" ref={this.wrapperRef}>
              {!showInput && (
                <button className="list__button" onClick={this.handleAddClick}>
                  <VscAdd style={{ marginRight: 8 }} />
                  <p>Añade otra lista</p>
                </button>
              )}
              {showInput && (
                <form className="list__inputs" onSubmit={this.handleAddList}>
                  <input
                    name="name"
                    type="text"
                    className="list__input"
                    placeholder="Introduce el nombre de la lista..."
                    autoFocus
                  />
                  <div className="list__controls">
                    <button className="list__add-button" type="submit">
                      Añadir lista
                    </button>
                    <div
                      style={{
                        padding: 6,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <VscChromeClose style={{ fontSize: 18 }} />
                    </div>
                  </div>
                </form>
              )}
            </article>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const boardId = state.boards.selectedId;

  if (boardId)
    return {
      lists: getOrderListByBoard(boardId)(state),
      boardId,
      board: getBoardById(boardId)(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
  listAdded: (newList) => dispatch(listAdded(newList)),
  listUnselected: (lists) => dispatch(listUnselected(lists)),
  addListUpdateOrder: (list, boardId) =>
    dispatch(addListUpdateOrder(list, boardId)),
  navbarClassChanged: (newClass) => dispatch(navbarClassChanged(newClass)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
