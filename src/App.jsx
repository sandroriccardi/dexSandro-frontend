import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import AllTasks from './components/AllTasks';
import AI from './components/AI';
import Talks from './components/Talks';
import Footer from './components/Footer';
import './config/fontawesome';
import './App.css';

function App() {
  useEffect(() => {
    // Set the browser title based on the environment
    const baseTitle = 'Sandro';
    const isDevelopment = process.env.NODE_ENV === 'development' || 
                         process.env.REACT_APP_ENVIRONMENT === 'development';
    
    if (isDevelopment) {
      document.title = `${baseTitle} - DEVELOPMENT`;
    } else {
      document.title = baseTitle;
    }
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-tasks" element={<AllTasks />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/talks" element={<Talks />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;