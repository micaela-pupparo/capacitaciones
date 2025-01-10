import React, { Component } from "react";
import { connect } from "react-redux";
import {
  listSelected,
  listUnselected,
  getListById,
  listDeleted,
} from "../store/lists";
import { taskAdded, getTasksByList } from "../store/tasks";
import Task from "./task";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { RxDotsHorizontal } from "react-icons/rx";
import { VscAdd, VscChromeClose } from "react-icons/vsc";
import "./list.css";

class List extends Component {
  state = {
    showInputTask: false,
    modalShow: false,
    draggedItem: null,
    draggingOver: null,
    tasksOrder: this.props.tasks || [],
  };

  wrapperRef = React.createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleInputClose);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleInputClose);
    this.props.listUnselected();
  }

  componentDidUpdate(prevProps) {
    if (this.props.tasks !== prevProps.tasks)
      this.setState({ tasksOrder: this.props.tasks });
  }

  handleInputClose = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ showInputTask: false });
    }
    // console.log("clicked");
  };

  handleNewTaskClick = (id) => {
    this.setState({ showInputTask: true });
    if (this.props.selectedList !== id) this.props.listSelected(id);
  };

  handleAddTask = (e) => {
    e.preventDefault();
    this.setState({ showInputTask: false });
    const newTask = {
      name: e.target.name.value,
      listId: this.props.id,
    };

    let newOrder = [...this.state.tasksOrder];
    newOrder.push(newTask);

    this.props.taskAdded(newTask);
    this.setState({
      tasksOrder: newOrder,
      draggedItem: null, // Asegurar que no hay tarea siendo arrastrada
    });
  };

  handleModalShow = () => {
    console.log("clicked");
    return this.state.modalShow
      ? this.setState({ modalShow: false })
      : this.setState({ modalShow: true });
  };

  handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.listDeleted(id);
  };

  handleDragStart = (e, task, taskIndex) => {
    e.stopPropagation();

    const draggedItem = { ...task, index: taskIndex };
    console.log("handle start: ", draggedItem);

    this.setState({
      draggedItem,
      draggingOver: null,
    });

    console.log(this.state.draggedItem);
  };

  handleDragOver = (e, target, targetIndex) => {
    e.preventDefault();
    // e.stopPropagation();

    const { draggedItem } = this.state;

    if (draggedItem && target && targetIndex) {
      if (draggedItem.id === target.id) return;

      const newDraggingOver = { ...target, index: targetIndex };

      this.setState({ draggingOver: newDraggingOver });
      const { tasksOrder, draggingOver } = this.state;

      const targetElement = e.currentTarget;
      if (!targetElement.contains(e.target)) return;

      const rect = targetElement.getBoundingClientRect();

      const mousePosition = e.clientY;

      const targetTop = rect.top;
      const targetHeight = rect.height;
      const targetCenter = targetTop + targetHeight / 2;

      // Arriba
      if (mousePosition < targetCenter) {
        if (
          !tasksOrder[targetIndex + 1] ||
          tasksOrder[targetIndex + 1].id !== draggedItem.id
        ) {
          this.setState({ draggingOver: null });
          return;
        }
        console.log("draggedItem: ", draggedItem);
        console.log("draggingOver: ", draggingOver);
        console.log("order: ", tasksOrder);

        const listToMoveToIndex = tasksOrder.find(
          (task) => task.id === draggedItem.id
        );
        const listToMoveDown = tasksOrder.find((task) => task.id === target.id);
        const newOrder = tasksOrder.filter(
          (task) => task.id !== target.id && task.id !== draggedItem.id
        );

        newOrder.splice(targetIndex, 0, listToMoveToIndex);
        newOrder.splice(targetIndex + 1, 0, listToMoveDown);

        this.setState({ tasksOrder: newOrder });
      } else {
        // Abajo
        if (
          !tasksOrder[targetIndex - 1] ||
          tasksOrder[targetIndex - 1].id !== draggedItem.id
        ) {
          this.setState({ draggingOver: null });
          return;
        }
        console.log("draggedItem: ", draggedItem);
        console.log("draggingOver: ", draggingOver);
        console.log("order: ", tasksOrder);

        const listToMoveToIndex = tasksOrder.find(
          (task) => task.id === draggedItem.id
        );
        const listToMoveUp = tasksOrder.find((task) => task.id === target.id);
        const newOrder = tasksOrder.filter(
          (task) => task.id !== target.id && task.id !== draggedItem.id
        );

        newOrder.splice(targetIndex, 0, listToMoveToIndex);
        newOrder.splice(targetIndex - 1, 0, listToMoveUp);

        this.setState({ tasksOrder: newOrder });
      }
    }
  };

  handleDragEnd = () => {
    this.setState({
      draggedItem: null,
    });
  };

  handleDrop = (e) => {};

  render() {
    const { list } = this.props;
    const { showInputTask, tasksOrder, draggedItem, dragTarget, dragSource } =
      this.state;

    return (
      <Card
        style={{
          padding: 8,
          height: "min-content",
          width: "18rem",
          boxSizing: "border-box",
          border: "0",
        }}
        className="list__inputs"
      >
        <Card.Title
          style={{
            paddingBottom: 20,
            fontSize: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: 0,
            margin: 0,
            marginBottom: 10,
          }}
          id={list.id}
        >
          <p style={{ fontWeight: "600", padding: "6px 8px 6px 12px" }}>
            {list.name}
          </p>
          <RxDotsHorizontal
            style={{ fontSize: 15 }}
            onClick={(e) => this.handleDelete(e, list.id)}
          />
        </Card.Title>

        {tasksOrder &&
          tasksOrder.map((task, index) => {
            if (!task || !task.id) return null;
            return (
              <div
                key={task.id}
                data-task-id={task.id}
                onDragStart={(e) => this.handleDragStart(e, task, index)}
                onDragOver={(e) => this.handleDragOver(e, task, index)}
                onDrop={this.handleDrop}
                onDragEnd={this.handleDragEnd}
                draggable
                style={{
                  position: "relative",
                  marginBottom: "8px",
                  opacity: draggedItem && draggedItem.id === task.id ? 0.5 : 1,
                }}
              >
                <Card
                  style={{ width: "100%", margin: "auto" }}
                  className="task"
                  onClick={this.handleModalShow}
                >
                  <Card.Text>{task.name}</Card.Text>
                </Card>
                <Task
                  show={this.state.modalShow}
                  onHide={this.handleModalShow}
                  name={task.name}
                  listName={list.name}
                />
              </div>
            );
          })}

        <Card
          style={{
            width: "100%",
            margin: "auto",
            background: "transparent",
            border: "none",
          }}
          ref={this.wrapperRef}
        >
          {!showInputTask && (
            <div
              onClick={() => this.handleNewTaskClick(list.id)}
              className="list__newtask"
            >
              <VscAdd />
              <div>Añade una tarjeta</div>
            </div>
          )}
          {showInputTask && (
            <form onSubmit={this.handleAddTask}>
              <Card.Text>
                <input
                  type="text"
                  placeholder="Introduce el nombre de la lista..."
                  name="name"
                  autoFocus
                  className="list__newtask__input"
                />
              </Card.Text>
              <Button
                variant="primary"
                type="submit"
                style={{ fontSize: 14, fontWeight: "600" }}
              >
                Añadir tarjeta
              </Button>
            </form>
          )}
        </Card>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: getListById(ownProps.id)(state),
  selectedList: state.lists.selectedList,
  tasks: getTasksByList(ownProps.id)(state),
});

const mapDispatchToProps = (dispatch) => ({
  listDeleted: (id) => dispatch(listDeleted(id)),
  listSelected: (id) => dispatch(listSelected(id)),
  listUnselected: (lists) => dispatch(listUnselected(lists)),
  taskAdded: (newTask) => dispatch(taskAdded(newTask)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
