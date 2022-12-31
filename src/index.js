import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Web3DriveProvider} from './context/Web3Drivecontext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Web3DriveProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Web3DriveProvider>
);