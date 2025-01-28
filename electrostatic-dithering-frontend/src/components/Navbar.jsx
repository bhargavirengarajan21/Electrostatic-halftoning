import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <h1 className="logo">Dithering App</h1>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/result">Results</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
