/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router";
import { screenChanged } from "../store/ui";
import { userLoggedOut } from "../store/users";
import { VscAccount } from "react-icons/vsc";
import "./navbar.css"

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
    return (
      <nav className="navbar">
        <div><h1><Link to="/">Trello</Link></h1></div>
        {this.props.user ? (
          <div className="navbar__items">
            <NavLink><VscAccount />{this.props.user.name}</NavLink>
            <NavLink to="/login" onClick={this.handleLogOut}>
              Cerrar Sesión
            </NavLink>
          </div>
        ) : (
          <div className="navbar__items">
            
              <NavLink to="/login">Iniciar Sesion</NavLink>
              <NavLink to="/register">Registrarse</NavLink>
            
          </div>
        )}
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
