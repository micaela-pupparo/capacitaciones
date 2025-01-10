import { Component } from "react";
import { Link } from "react-router";
import Button from "react-bootstrap/Button";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <section className="home">
        <div className="hero-container">
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
              <form className="hero__form">
                <input
                  type="text"
                  placeholder="Correo electrónico"
                  className="hero__form-input"
                />
                <button type="submit" className="hero__form-button">
                  Regístrate, ¡es gratis!
                </button>
              </form>
              {/* <article
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
              </article> */}
            </div>
            <div className="hero__column" id="hero__image">
              <img
                sizes="(max-width: 1300px) 100vw, 1300px"
                srcSet="
              01_Hero_2x_q4wg87_c_scale,w_300.webp 300w,
              01_Hero_2x_q4wg87_c_scale,w_765.webp 765w,
              01_Hero_2x_q4wg87_c_scale,w_1300.webp 1300w"
                src="01_Hero_2x_q4wg87_c_scale,w_1300.webp"
                alt=""
              />
            </div>
          </div>
        </div>
        <section className="info">
          <div className="info__wrapper">
            <div className="title__info">
              <h3>Explore Trello’s features that help your team succeed</h3>
            </div>
            <div className="badges">
              <div className="badge--active">Cards</div>
              <div className="badge">Views</div>
              <div className="badge">Automation</div>
            </div>
            <div className="tasks-info">
              <div className="task-info__text">
                <h4 className="task-info__text__title">
                  Manage tasks with ease.
                </h4>
                <ul>
                  <li>
                    <strong>Members:</strong> Keep everyone accountable and
                    never have to ask “who’s doing that” by adding members to
                    cards for their projects and tasks.{" "}
                  </li>
                  <li>
                    <strong>Due dates:</strong> They're easy to set, hard to
                    miss (with reminders!), and oh-so-satisfying to mark as
                    “done.”{" "}
                  </li>
                  <li>
                    <strong>Attachments:</strong> No more digging through
                    endless email chains to find attachments. Just drag and drop
                    them onto a card so the right files stay with the right
                    tasks.{" "}
                  </li>
                  <li>
                    <strong>Checklists:</strong> Your best tool to overpower
                    overwhelming asks. Break big tasks into small ones, check
                    things off the list, and watch that status bar go to 100%
                    complete.{" "}
                  </li>
                </ul>
              </div>
              <div className="task-info__image">
                <img src="/tasks.webp" alt="" />
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default Home;
