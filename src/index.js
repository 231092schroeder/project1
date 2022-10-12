import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/global-style.css';
import { Home } from './pages/Home/Home.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);