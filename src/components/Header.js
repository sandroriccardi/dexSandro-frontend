import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Sandro</h1>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/all-tasks" 
                className={`nav-link ${location.pathname === '/all-tasks' ? 'active' : ''}`}
              >
                All Tasks
              </Link>
            </li>
            <li>
              <Link 
                to="/ai" 
                className={`nav-link ${location.pathname === '/ai' ? 'active' : ''}`}
              >
                AI
              </Link>
            </li>
            <li><a href="#services" className="nav-link">Services</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;