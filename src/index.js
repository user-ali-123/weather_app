import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Weather from './Weather';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/Weather" element={<Weather/>}/>
    </Routes>
    </Router>,
    document.getElementById('root')
);

reportWebVitals();
