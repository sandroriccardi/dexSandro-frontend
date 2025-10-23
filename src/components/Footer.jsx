import React from 'react';
import './Footer.css';
import packageInfo from '../../package.json';

const Footer = () => {
  const environment = process.env.NODE_ENV || 'development';
  const buildDate = new Date().toISOString().slice(0, 10);
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Sandro</h3>
            <p>Building amazing web experiences with React.</p>
          </div>
          {/* <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div> */}
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: sandroriccardi84@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 Sandro. All rights reserved.</p>
            <p className="version-info" data-env={environment}>
              {environment.toUpperCase()} | Version {packageInfo.version} | Build {buildDate}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;