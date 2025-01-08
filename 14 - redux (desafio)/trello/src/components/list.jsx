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
import { SlTrash } from "react-icons/sl";

class List extends Component {
  state = {
    showInputTask: false,
    modalShow: false,
    draggedItem: null,
    dragSource: null,
    dragTarget: null,
    tasksOrder: this.props.tasks,
  };

  wrapperRef = React.createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleInputClose);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleInputClose);
    this.props.listUnselected();
  }

  handleInputClose = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ showInputTask: false });
    }
    console.log("clicked");
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

    this.props.taskAdded(newTask);
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

  handleDragStart = (e, task, listId) => {
    e.stopPropagation();

    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ taskId: task.id, sourceListId: listId, type: "TASK" })
    );

    this.setState({ draggedItem: task, dragSource: listId });
  };

  handleDragOver = (e, targetListId, targetTaskId = null) => {
    e.preventDefault();

    const mouseY = e.clientY;
    const targetRect = e.currentTarget.getBoundingClientRect();
    const isUpperHalf = mouseY < targetRect.top + targetRect.height / 2;

    this.setState({
      dragTarget: {
        listId: targetListId,
        taskId: targetTaskId,
        position: isUpperHalf ? "before" : "after",
      },
    });
  };

  handleDragEnd = () => {
    this.setState({
      draggedItem: null,
      dragSource: null,
      dragTarget: null,
    });
  };

  handleDrop = (e) => {
    e.preventDefault();

    const dropData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { taskId, sourceListId, type } = dropData;
    const { dragTarget } = this.state;

    if (type === "TASK") {
      this.moveTask(taskId, dragTarget);
    }
  };

  moveTask = (taskId, target) => {
    let prevOrder = [...this.state.tasksOrder];

    let draggedTask;
    let newOrder = prevOrder.filter((task) => {
      if (task.id !== taskId) {
        return true;
      } else {
        draggedTask = task;
        return false;
      }
    });

    let targetIndex = target.taskId
      ? newOrder.findIndex((task) => task.id === target.taskId)
      : -1;

    let insertIndex = target.taskId
      ? targetIndex + (target.position === "after" ? 1 : 0)
      : newOrder.length;

    newOrder.splice(insertIndex, 0, draggedTask);
    this.setState({ tasksOrder: newOrder });
  };

  render() {
    const { list } = this.props;
    const { showInputTask, tasksOrder } = this.state;
    return (
      <Card
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={(e) => this.handleDrop(e, list.id)}
        style={{
          padding: 8,
          height: "min-content",
          width: "18rem",
          boxSizing: "border-box",
        }}
        className="m-2"
      >
        <Card.Title
          style={{
            paddingBottom: 20,
            fontSize: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
          id={list.id}
        >
          <p>{list.name}</p>
          <SlTrash
            style={{ fontSize: 15 }}
            onClick={(e) => this.handleDelete(e, list.id)}
          />
        </Card.Title>

        {tasksOrder &&
          tasksOrder.map((task) => (
            <div key={task}>
              <Card
                style={{ width: "100%", margin: "auto", padding: 4 }}
                key={task.id}
                className="mb-2"
                onClick={this.handleModalShow}
                draggable
                onDragStart={(e) => this.handleDragStart(e, task, list.id)}
                onDragEnd={this.handleDragEnd}
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
          ))}
        <Card
          style={{ width: "100%", margin: "auto", padding: 4 }}
          ref={this.wrapperRef}
        >
          {!showInputTask && (
            <Card.Text onClick={() => this.handleNewTaskClick(list.id)}>
              Añade otra tarea
            </Card.Text>
          )}
          {showInputTask && (
            <form onSubmit={this.handleAddTask}>
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
