import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/Input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  // para poder acceder a un elemento del dom sin document.queryselector, creamos una referencia con react
  // username = React.createRef();
  // se deberia minimizar el uso de refs y usarlos solo cuando realmente se necesitan. para este caso los estamos utilizando para acceder al focus del input field.
  // componentDidMount() {
  //   this.username.current.focus();
  // } esto es totalmente al pedo porque podemos usar el atributo autofocus

  validate = () => {
    // por default Joi terminates las validaciones cuando encuentra un error, por eso debemos sacare ese comportamiento para obtener todos los errores
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);

    if (!error) return null;

    // mapeamos un array a un objeto
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // luego con esa referencia podemos acceder al elemento con current z de ahi sacamos su valor
    // const username = this.username.current.value;

    const errors = this.validate();
    // debemos hacer esto en setstate porque siempre se le debe pasar un objeto a errors, si se le pasa null tira error
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("submitted");
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required.";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required.";
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />

          <button className="btn btn-primary">Login</button>
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

export default LoginForm;
