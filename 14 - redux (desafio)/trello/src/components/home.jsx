import { Component } from "react";
import { Link } from "react-router";
import Button from "react-bootstrap/Button";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <section>
        <div className="hero">
          <div className="hero__column">
            <h2>
              Trello makes it easier for teams to manage projects and tasks
            </h2>
            <p>
              Simple, flexible, and powerful. All it takes are boards, lists,
              and cards to get a clear view of who’s doing what and what needs
              to get done.
            </p>

            <p>WHAT YOU GET ON THE FREE PLAN:</p>
            <ul>
              <li>Unlimited cards</li>
              <li>Unlimited Power-Ups per board</li>
            </ul>
            <article
              style={{ width: "100%", textAlign: "center", marginTop: "4rem" }}
            >
              <h2>Regístrate o Inicia Sesión</h2>
              <div
                style={{
                  margin: "1rem auto",
                  padding: "2rem",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Link to="/register">
                  <Button size="lg">Registrarse</Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="secondary">
                    Iniciar Sesion
                  </Button>
                </Link>
              </div>
            </article>
          </div>
          <div className="hero__column" id="hero__image">
            <img src="/hero.webp" alt="" />
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
