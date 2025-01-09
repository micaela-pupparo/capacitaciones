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

  handleDragStart = (e, task, listId) => {
    e.stopPropagation();
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ taskId: task.id, sourceListId: listId, type: "TASK" })
    );
    this.setState({
      draggedItem: task,
      dragSource: listId,
    });
  };

  handleDragOver = (e, targetListId, targetTaskId = null) => {
    e.preventDefault();
    e.stopPropagation();

    if (targetTaskId) {
      const mouseY = e.clientY;
      const rect = e.currentTarget.getBoundingClientRect();
      const position = mouseY < rect.top + rect.height / 2 ? "before" : "after";

      this.setState({
        dragTarget: {
          listId: targetListId,
          taskId: targetTaskId,
          position: position,
        },
      });
    } else {
      this.setState({
        dragTarget: {
          listId: targetListId,
          taskId: null,
          position: "end",
        },
      });
    }
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
    e.stopPropagation();

    try {
      const dropData = JSON.parse(e.dataTransfer.getData("text/plain"));
      const { taskId, sourceListId } = dropData;
      const { dragTarget, tasksOrder } = this.state;

      if (!dragTarget || !taskId) return;

      const newTasksOrder = [...tasksOrder];

      // Si la tarea viene de otra lista, no la removemos del array actual
      const draggedTaskIndex =
        sourceListId === this.props.list.id
          ? newTasksOrder.findIndex((t) => t.id === taskId)
          : -1;

      let draggedTask;

      if (draggedTaskIndex !== -1) {
        // Si la tarea es de esta lista, la removemos
        [draggedTask] = newTasksOrder.splice(draggedTaskIndex, 1);
      } else {
        // Si la tarea es de otra lista, la buscamos en las props
        draggedTask = this.props.tasks.find((t) => t.id === taskId);
        if (!draggedTask) return;
      }

      // Determinar la posición de inserción
      let insertIndex;
      if (!dragTarget.taskId || dragTarget.position === "end") {
        insertIndex = newTasksOrder.length;
      } else {
        const targetIndex = newTasksOrder.findIndex(
          (t) => t.id === dragTarget.taskId
        );
        if (targetIndex === -1) {
          insertIndex = newTasksOrder.length;
        } else {
          insertIndex =
            dragTarget.position === "after" ? targetIndex + 1 : targetIndex;
        }
      }

      // Insertar la tarea en la nueva posición
      newTasksOrder.splice(insertIndex, 0, draggedTask);

      this.setState({ tasksOrder: newTasksOrder });
    } catch (error) {
      console.error("Error en handleDrop:", error);
    }
  };

  render() {
    const { list } = this.props;
    const { showInputTask, tasksOrder, draggedItem, dragTarget, dragSource } =
      this.state;

    return (
      <Card
        // onDragOver={(e) => this.handleDragOver(e, list.id)}
        // onDrop={this.handleDrop}
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
            <div
              key={task.id}
              data-task-id={task.id}
              // onDragStart={(e) => this.handleDragStart(e, task, list.id)}
              // onDragOver={(e) => this.handleDragOver(e, list.id, task.id)}
              // onDrop={this.handleDrop}
              // onDragEnd={this.handleDragEnd}
              // draggable
              style={{
                position: "relative",
                marginBottom: "8px",
                opacity: draggedItem && draggedItem.id === task.id ? 0.5 : 1,
              }}
            >
              <Card
                style={{ width: "100%", margin: "auto", padding: 4 }}
                className="mb-2"
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
