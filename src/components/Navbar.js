import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <ul className="navbar-list">
      <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
      <li className="navbar-item"><Link to="/products" className="navbar-link">Products</Link></li>
      <li className="navbar-item"><Link to="/about-us" className="navbar-link">About Us</Link></li>
    </ul>
  </nav>
);

export default Navbar;
