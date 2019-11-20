import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './styles/styles.scss';

function App() {
  return (
    <BrowserRouter
    // basename="/dragalia-lost"
    >
      <Routes />
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
