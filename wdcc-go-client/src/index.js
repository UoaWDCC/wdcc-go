import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { IndexPage } from './pages/index.page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IndexPage />
  </React.StrictMode>
);