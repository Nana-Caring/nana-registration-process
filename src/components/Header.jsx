import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = ({ title = "Nana Caring", subtitle = "Empowering Families, Ensuring Every Child's Needs Are Met" }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo-section">
          <img src={logo} alt="Nana Logo" className="header-logo" />
          <div className="header-text">
            <h1 className="header-title">{title}</h1>
            {subtitle && <p className="header-subtitle">{subtitle}</p>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
