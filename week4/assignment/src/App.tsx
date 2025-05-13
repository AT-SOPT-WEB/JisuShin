import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { themeClass } from './styles/theme.css';
import './styles/reset.css';
import './styles/global.css';
import Login from './pages/Login';

function App() {
  return (
    <div className={themeClass}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;