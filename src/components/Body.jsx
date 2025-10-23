import React from 'react';
import './Body.css';
import Tasks from './Tasks';

const Body = () => {
  return (
    <main className="body">
      <div className="body-container">
        <section className="hero-section">
          <h1>Welcome</h1>
          {/* <p className="hero-text">
            This is the main body content of our React application. 
            Here you can add any content you want to display on your homepage.
          </p> */}
          {/* <div className="content-card">
            <h2>Getting Started</h2>
            <p>
              This React app features a clean structure with separate Header, Body, and Footer components. 
              You can easily customize each section to match your needs.
            </p>
          </div> */}
          <div className="content-card">
            <Tasks />
          </div>
          {/* <div className="content-card">
            <h2>Features</h2>
            <ul>
              <li>Responsive design that works on all devices</li>
              <li>Modern CSS with gradients and animations</li>
              <li>Component-based architecture</li>
              <li>Clean and professional styling</li>
            </ul>
          </div> */}
        </section>
      </div>
    </main>
  );
};

export default Body;