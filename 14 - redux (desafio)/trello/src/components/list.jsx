import React, { Component } from "react";
import { connect } from "react-redux";
import { listSelected, listUnselected, getListById } from "../store/lists";
import { taskAdded, getTasksByList } from "../store/tasks";
import Task from "./task";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class List extends Component {
  state = {
    showInputTask: false,
    modalShow: false,
  };

  componentWillUnmount() {
    this.props.listUnselected();
  }

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
    console.log("clicked")
    return this.state.modalShow
      ? this.setState({ modalShow: false })
      : this.setState({ modalShow: true });
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
        <Card.Title className="mb-4">{list.name}</Card.Title>

        {tasks &&
          tasks.map((task) => (
            <React.Fragment key={task}>
              <Card
                style={{ width: "100%", margin: "auto", padding: 4 }}
                key={task.id}
                className="mb-2"
                onClick={this.handleModalShow}
              >
                <Card.Text >
                  {task.name}
                </Card.Text>
              </Card>
              <Task show={this.state.modalShow} onHide={this.handleModalShow} name={task.name} listName={list.name}/>
            </React.Fragment>
          ))}
        <Card style={{ width: "100%", margin: "auto", padding: 4 }}>
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
  listSelected: (id) => dispatch(listSelected(id)),
  listUnselected: (lists) => dispatch(listUnselected(lists)),
  taskAdded: (newTask) => dispatch(taskAdded(newTask)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
