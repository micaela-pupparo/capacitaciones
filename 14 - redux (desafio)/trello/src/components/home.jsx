import React, { Component } from "react";
import { Link } from "react-router";
import Button from "react-bootstrap/Button";

class Home extends Component {
  render() {
    return (
      <article style={{width: "100%", textAlign: "center"}}>
        <h2>Registrate o Inicia Sesion</h2>
        <div style={{margin: "1rem auto", padding: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10}}>
          <Link to="/register">
            <Button size="lg">Registrarse</Button>
          </Link>

          <Link to="/login">
            <Button size="lg" variant="secondary">Iniciar Sesion</Button>
          </Link>
        </div>
      </article>
    );
  }
}

export default Home;
