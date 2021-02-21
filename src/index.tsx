import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import MainRoute from './components/Router';
import BankContextProvider from './contexts/BankContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <BankContextProvider>
        <MainRoute />      
      </BankContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
