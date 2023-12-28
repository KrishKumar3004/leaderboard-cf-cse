import Board from './components/Board';
import './components/style.css';
import Navbar from './components/Navbar'

import React, { useState } from 'react'

function App() {

  return (
    <div className="App" id='main'>
      <Navbar />
      <Board></Board>
    </div>
  );
}

export default App;