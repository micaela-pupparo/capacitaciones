import React, { Component } from "react";
import { connect } from "react-redux";
import List from "./list";
import { VscAdd, VscChromeClose } from "react-icons/vsc";
import {
  listAdded,
  getAllListsByBoardId,
  listUnselected,
} from "../store/lists";
import { getOrderListByBoard } from "../store/boards";
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
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleInputClose);
    this.props.listUnselected();
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

  handleDrop = (e, index) => {
    // const { listsOrder, draggedItemIndex } = this.state;
    // const newOrder = [...listsOrder];
    // const [draggedItem] = newOrder.splice(draggedItemIndex, 1);
    // newOrder.splice(index, 0, draggedItem);
    // this.setState({ listsOrder: newOrder, draggedItemIndex: null });
  };

  render() {
    const { listsRefs, showInput, draggingOver } = this.state;
    return (
      <div className="lists__container">
        <aside className="nav-lists__container"></aside>
        <main className="main-lists__container">
          <div
            className="lists"
            // onDragOver={(e) => this.handleDragOver(e)}
            // onDragEnter={(e) => this.handleDragEnter(e)}
          >
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
      // <div
      //   style={{
      //     display: "flex",
      //     flexWrap: "wrap",
      //     justifyContent: "center",
      //     alignContent: "baseline",
      //   }}
      // >
      //   {this.props.lists.map((id) => (
      //     <List id={id} key={id}></List>
      //   ))}
      //   <Card
      //     style={{ width: "18rem", height: "fit-content", minHeight: 75 }}
      //     className="m-2"
      //     ref={this.wrapperRef}
      //   >
      //     <Card.Body style={{ padding: 8 }}>
      //       {!showInput && (
      //         <Card.Text onClick={this.handleAddClick}>
      //           Añade otra lista
      //         </Card.Text>
      //       )}
      //       {showInput && (
      //         <form onSubmit={this.handleAddList}>
      //           <Card.Text>
      //             <input
      //               type="text"
      //               placeholder="Introduce el nombre de la lista..."
      //               name="name"
      //               autoFocus
      //             />
      //           </Card.Text>
      //           <Button variant="primary" type="submit">
      //             Añadir lista
      //           </Button>
      //         </form>
      //       )}
      //     </Card.Body>
      //   </Card>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  const boardId = state.boards.selectedId;

  if (boardId)
    return {
      lists: getOrderListByBoard(boardId)(state),
      boardId,
    };
};

const mapDispatchToProps = (dispatch) => ({
  listAdded: (newList) => dispatch(listAdded(newList)),
  listUnselected: (lists) => dispatch(listUnselected(lists)),
  addListUpdateOrder: (list, boardId) =>
    dispatch(addListUpdateOrder(list, boardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
