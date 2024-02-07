import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Ej1 from './Ejericios/Ej1'
import Ej2 from './Ejericios/Ej2';
import Ej3 from './Ejericios/Ej3';
import Ej4 from './Ejericios/Ej4';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Ej1 />
    <Ej2 />
    <Ej3 />
    <Ej4 />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
