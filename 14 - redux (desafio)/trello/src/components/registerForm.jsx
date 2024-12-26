import Joi from "joi-browser";
import { connect } from "react-redux";
import Form from "./common/Form";
import { userAdded } from "../store/users";

class RegisterForm extends Form {
  state = {
    data: { username: "", name: "" },
    errors: {},
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

    this.props.userAdded(newUser);
    console.log("Submitted");
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
