import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
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

  doSubmit = () => {
    // call the server
    console.log("submitted");
  };

  render() {
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

export default LoginForm;
