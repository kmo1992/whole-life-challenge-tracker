// src/App.jsx

import React from 'react';
import WeekView from './components/WeekView';
import IconKey from './components/IconKey';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Healthy Habits Tracker</h1>
      <IconKey />
      <WeekView />
    </div>
  );
}

export default App;
