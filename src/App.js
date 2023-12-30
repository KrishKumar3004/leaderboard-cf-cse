import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Board from './components/Board';
import Register from './components/Register'
import './components/style.css';

function App() {
  const handleRegister = async (formData) => {
    try {
      const email = `${formData.regno.toLowerCase()}@nitjsr.ac.in`;
      const batch = formData.regno.substring(0, 4);

      formData = {
        ...formData,
        email,
        batch,
      };
      console.log(formData);
      console.log("Working");
      const apiUrl = 'https://pcon-leaderboard-backend.vercel.app/api/registerCfHandle';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API response:', data);
      } else {
        const errorData = await response.json();
        console.error('API error:', errorData);
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
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
              <Register onRegister={handleRegister} />
            }
          />
        </Routes>
      </Router>

    </div>
  );
}

export default App;