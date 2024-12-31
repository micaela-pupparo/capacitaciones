import React, { Component } from "react";
import { connect } from "react-redux";
import { listSelected, listUnselected, getListById } from "../store/lists";
import { taskAdded, getTasksByList } from "../store/tasks";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class List extends Component {
  state = {
    showInputTask: false,
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

  render() {
    const { list, tasks } = this.props;
    const { showInputTask } = this.state;
    return (
      <Card style={{ width: "18rem", paddingBottom: 16, marginBottom: 16 }}>
        <Card.Body>
          <Card.Title>{list.name}</Card.Title>
        </Card.Body>
        {tasks &&
          tasks.map((task) => (
            <Card style={{ width: "14rem", margin: "auto" }} key={task.id}>
              <Card.Body>
                <Card.Title>{task.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        <Card style={{ width: "14rem", margin: "auto" }}>
          <Card.Body>
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
          </Card.Body>
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
