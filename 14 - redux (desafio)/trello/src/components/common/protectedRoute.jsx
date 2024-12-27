/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Navigate } from "react-router";
import { connect } from "react-redux";

class ProtectedRoute extends Component {
  render() {
    if (!this.props.user) {
      return <Navigate to="/landing" replace />;
    }

    return this.props.children;
  }
}

const mapStateToProps = (state) => ({
  user: state.users.logged,
});

export default connect(mapStateToProps)(ProtectedRoute);
