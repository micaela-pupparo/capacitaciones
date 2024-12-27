/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { screenChanged } from "../store/ui";
import { userLoggedOut } from "../store/users";

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
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <NavLink to="/">Trello</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
            <Nav>
              {this.props.user ? (
                <React.Fragment>
                  <NavLink>{this.props.user.name}</NavLink>
                  {/* TODO: pagina de inicio cuando no hay usuario */}
                  <NavLink to="/login" onClick={this.handleLogOut}>
                    Cerrar Sesión
                  </NavLink>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Nav.Link>
                    <NavLink to="/login">Iniciar Sesion</NavLink>
                  </Nav.Link>
                  <Nav.Link eventKey={2}>
                    <NavLink to="/register">Registrarse</NavLink>
                  </Nav.Link>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
