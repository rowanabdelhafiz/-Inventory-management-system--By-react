import React from 'react';
import ReactDOM, { createRoot } from 'react-dom';
import App from './App';


const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
   
      <App />
    
  </React.StrictMode>,
);
