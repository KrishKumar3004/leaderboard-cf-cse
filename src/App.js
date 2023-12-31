import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Board from './components/Board';
import Register from './components/Register'
import './components/style.css';

function App() {

  return (
    <div className='d-flex flex-column vh-100' id="app">
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact path="/"
            element={
              <Board />
            }
          />
          <Route
            exact path="/register"
            element={
              <Register />
            }
          />
        </Routes>
      </Router>

    </div>
  );
}

export default App;