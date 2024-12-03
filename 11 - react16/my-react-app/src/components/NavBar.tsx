import * as React from "react";

interface NavBarProps {
  totalCounters: number;
}

// Stateless Functional Components
const NavBar: React.FC<NavBarProps> = ({ totalCounters }): JSX.Element => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar{" "}
        <span className="badge rounded-pill bg-secondary">{totalCounters}</span>
      </a>
    </nav>
  );
};

export default NavBar;
