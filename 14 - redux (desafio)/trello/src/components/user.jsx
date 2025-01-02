import { connect } from "react-redux";
import Joi from "joi-browser";
import { Navigate } from "react-router";
import { userModified, userDeleted } from "../store/users";
import Button from "react-bootstrap/Button";
import Form from "./common/Form";
import "./form.css";

class User extends Form {
  state = {
    data: {
      username: this.props.user.username,
      name: this.props.user.name,
      password: "*****",
    },
    errors: {},
    clickedModify: false,
    redirect: false,
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = (event) => {
    if (this.state.clickedModify) {
      const modifiedUser = {
        name: event.target.name.value,
        username: event.target.username.value,
      };

      console.log(modifiedUser);

      const existingUsername = this.props.allUsers.find(
        (user) => user.username === modifiedUser.username
      );

      if (
        existingUsername &&
        existingUsername.username !== this.props.user.username
      )
        return this.setState({
          errors: { username: "Nombre de usuario se encuentra en uso" },
        });

      this.setState({ redirect: true });
      return this.props.userModified(modifiedUser);
    }

    this.props.userDeleted(this.props.user);
  };

  render() {
    if (this.state.redirect) return <Navigate to="/boards" replace />;
    return (
      <div className="form-container">
        <h1>{this.props.user.name}</h1>
        <form onSubmit={this.handleSubmit} className="form">
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          <Button
            variant="warning"
            style={{ marginRight: 2 }}
            type="submit"
            onClick={() => this.setState({ clickedModify: true })}
          >
            Modificar
          </Button>
          <Button
            variant="danger"
            onClick={() => this.setState({ clickedModify: false })}
            type="submit"
          >
            Eliminar
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users.logged,
  allUsers: state.users.list,
});

const mapDispatchToProps = (dispatch) => ({
  userModified: (modifiedUser) => dispatch(userModified(modifiedUser)),
  userDeleted: (deletedUser) => dispatch(userDeleted(deletedUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
