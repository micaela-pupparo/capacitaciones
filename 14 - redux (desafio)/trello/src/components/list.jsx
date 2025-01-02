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

  render() {
    const { list, tasks } = this.props;
    const { showInputTask } = this.state;
    return (
      <Card
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

        {tasks &&
          tasks.map((task) => (
            <React.Fragment key={task}>
              <Card
                style={{ width: "100%", margin: "auto", padding: 4 }}
                key={task.id}
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
            </React.Fragment>
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
