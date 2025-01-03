/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router";
import { screenChanged } from "../store/ui";
import { userLoggedOut } from "../store/users";
import { VscAccount } from "react-icons/vsc";
import { MdApps, MdExpandMore } from "react-icons/md";
import "./navbar.css";

class NavBar extends Component {
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    let newSize = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
    this.props.screenChanged(newSize);
  };

  handleLogOut = () => {
    this.props.userLoggedOut();
  };
  render() {
    return this.props.user ? (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar__leftside">
            <MdApps />
            <Link to="/boards" className="navbar__logo-link">
              <div className="navbar__logo-container"></div>
            </Link>
            <div className="navbar__link">
              <span>Espacios de trabajo</span>
              <MdExpandMore style={{ minWidth: 16 }} />
            </div>
          </div>
          <div className="navbar__items">
            <div>
              <NavLink
                to={`/user/${this.props.user.name}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                <VscAccount style={{ marginRight: 3, fontSize: 15 }} />
                {this.props.user.name}
              </NavLink>
            </div>
            <NavLink to="/login" onClick={this.handleLogOut}>
              Cerrar Sesión
            </NavLink>
          </div>
        </div>
      </nav>
    ) : (
      <nav className="navbar">
        <div className="navbar__home">
          <div>
            <Link to="/" className="navbar__home__link">
              <img src="/trello-atlassian.png" alt="" />
            </Link>
          </div>
          {/* <div className="navbar__items">
            <NavLink to="/login">Iniciar Sesion</NavLink>
            <NavLink to="/register">Registrarse</NavLink>
          </div> */}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  screen: state.ui.screen,
  user: state.users.logged,
});

const mapDispatchToProps = (dispatch) => ({
  screenChanged: (ui) => dispatch(screenChanged(ui)),
  userLoggedOut: (users) => dispatch(userLoggedOut(users)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
