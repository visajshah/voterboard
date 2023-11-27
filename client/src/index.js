// Index file for rendering the root component
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Create a root for React concurrent mode
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within the BrowserRouter and StrictMode
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
