import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  // para poder acceder a un elemento del dom sin document.queryselector, creamos una referencia con react
  // username = React.createRef();
  // se deberia minimizar el uso de refs y usarlos solo cuando realmente se necesitan. para este caso los estamos utilizando para acceder al focus del input field.
  // componentDidMount() {
  //   this.username.current.focus();
  // } esto es totalmente al pedo porque podemos usar el atributo autofocus

  handleSubmit = (e) => {
    e.preventDefault();

    // luego con esa referencia podemos acceder al elemento con current z de ahi sacamos su valor
    // const username = this.username.current.value;
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
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={account.username}
              onChange={this.handleChange}
              // ref={this.username}
              id="username"
              name="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleChange}
              name="password"
              id="password"
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

// cuando construimos forms usualmente estos tienen un estado que es inicializado basado en lo que obtenemos del servidor
// deberiamos tener solo el estado del componente login y deshacernos de los estados que tienen los input fields para tener un single source of truth
// para eso debemos convertir al input en un control element: no tienen su propio estado y obtienen todos los datos via props

export default LoginForm;
