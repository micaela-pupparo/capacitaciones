import * as React from "react";

interface NavBarProps {
  totalCounters: number;
}

class NavBar extends React.Component<NavBarProps, object> {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar{" "}
          <span className="badge rounded-pill bg-secondary">
            {this.props.totalCounters}
          </span>
        </a>
      </nav>
    );
  }
}

export default NavBar;
