import React, { Component } from "react";
import Input from "./common/Input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  // para poder acceder a un elemento del dom sin document.queryselector, creamos una referencia con react
  // username = React.createRef();
  // se deberia minimizar el uso de refs y usarlos solo cuando realmente se necesitan. para este caso los estamos utilizando para acceder al focus del input field.
  // componentDidMount() {
  //   this.username.current.focus();
  // } esto es totalmente al pedo porque podemos usar el atributo autofocus

  validate = () => {
    return { username: "Username is required" };
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // luego con esa referencia podemos acceder al elemento con current z de ahi sacamos su valor
    // const username = this.username.current.value;

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    console.log("submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
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
