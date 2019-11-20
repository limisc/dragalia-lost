import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import Routes from './Routes';
import './styles/styles.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter
      // basename="/dragalia-lost"
      >
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
