import Joi from "joi-browser";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import Form from "./common/Form";
import { userAdded, userLoggedIn } from "../store/users";
import "./form.css"

class RegisterForm extends Form {
  state = {
    data: { username: "", name: "" },
    errors: {},
    redirect: false,
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = (event) => {
    let newUser = {
      username: event.target.username.value,
      name: event.target.name.value,
    };

    sessionStorage.setItem("user", JSON.stringify(newUser));
    this.props.userAdded(newUser);
    this.props.userLoggedIn(newUser);
    console.log("Submitted");

    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect) return <Navigate to="/boards" replace />;
    return (
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit} className="form">
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  userAdded: (user) => dispatch(userAdded(user)),
  userLoggedIn: (user) => dispatch(userLoggedIn(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
