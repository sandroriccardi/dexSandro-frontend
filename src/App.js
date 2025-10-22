import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import AllTasks from './components/AllTasks';
import AI from './components/AI';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-tasks" element={<AllTasks />} />
            <Route path="/ai" element={<AI />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;