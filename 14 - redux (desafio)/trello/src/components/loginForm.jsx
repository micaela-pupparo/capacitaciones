import Joi, { errors } from "joi-browser";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import Form from "./common/Form";
import { userLoggedIn } from "../store/users";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    redirect: false,
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = (event) => {
    let user = this.props.users.find(
      (user) => user.username === event.target.username.value
    );

    if (!user)
      return this.setState({
        errors: { username: "Los datos son inválidos." },
      });

    this.props.userLoggedIn(user);
    console.log("Submitted");

    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) return <Navigate to="/" replace />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

// cuando construimos forms usualmente estos tienen un estado que es inicializado basado en lo que obtenemos del servidor
// deberiamos tener solo el estado del componente login y deshacernos de los estados que tienen los input fields para tener un single source of truth
// para eso debemos convertir al input en un controlled element: no tienen su propio estado y obtienen todos los datos via props
// null y undefined no pueden ser usados como valores iniciales para los elementos controlados porque react no los toma
// y asume que los inputs tienen su propio estado.
// entonces, debemos inicializar los valores con un string vacio o con un valor que traemos del servidor

const mapStateToProps = (state) => ({
  users: state.users.list,
});

const mapDispatchToProps = (dispatch) => ({
  userLoggedIn: (user) => dispatch(userLoggedIn(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
